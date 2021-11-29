/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

const express = require("express");
const http = require("http");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("./data").userDB;
var cors = require("cors");

const app = express();
const server = http.createServer(app);

var refreshTokensDB = []; // to store the refresh tokens when they are generated.

app.use(express.json());
app.use(cors());

// This endpoint will register new user
app.post("/register", async (req, res) => {
  try {
    let foundUser = users.find((data) => req.body.email === data.email);
    if (!foundUser) {
      let hashPassword = await bcrypt.hash(req.body.password, 10);

      let newUser = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        phone: req.body.phone,
        role: req.body.roles.role,
      };

      users.push(newUser); // it will store the user data in the file 'data.js'
      console.log("User list", users);

      res.json({ message: "Registration successful" });
    } else {
      res.json({ message: "Registration failed" });
    }
  } catch {
    res.json({ message: "Internal server error" });
  }
});

// '/login' route will authenticate the user
// and only after successful authentication,
// it will send access and refresh tokens
app.post("/login", async (req, res) => {
  try {
    let foundUser = users.find((data) => req.body.email === data.email);
    if (foundUser) {
      let submittedPass = req.body.password;
      let storedPass = foundUser.password;

      const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
      if (passwordMatch) {
        const role = foundUser.role;

        const name = foundUser.name;
        const phone = foundUser.phone;

        const tokenEmail = req.body.email;
        const payload = { email: tokenEmail };

        const aToken = generateAccessToken(payload);
        const rToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

        refreshTokensDB.push(rToken); // it will store the newly generated refresh tokens

        res.json({
          name: name,
          AccessToken: aToken,
          RefreshToken: rToken,
          message: "You are logged-in",
          userRole: role,
          phone: phone,
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`; //fake password is used just to slow down the time required to send a response to the user
      await bcrypt.compare(req.body.password, fakePass);
      res.status(401).json({ message: "Invalid email or password -----" }); //!read about 4xx errors
      // res.json({ message: "Invalid email or password -----" });
    }
  } catch {
    res.json({ message: "Internal server error" });
  }
});

// Following function will generate access token that will be valid for 2 minutes
function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1140m",
  });
}

// '/token' endpoint will accept the refresh token to generate new access token
app.post("/token", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.json({ message: "Invalid refresh token" });
  }

  if (!refreshTokensDB.includes(token)) {
    res.json({ message: "Forbidden" });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) {
      res.json({ message: "Some error occured" });
    } else {
      const accessToken = generateAccessToken({ email: payload.email });

      res.json({
        AccessToken: accessToken,
        message: "This is your new access token",
      });
    }
  });
});

// '/delRefreshToken' endpoint will be used by the legitimate client
// to delete the refresh token when his/her access token is compromised/stolen.
// This endpoint will accept the Refresh token and delete it from the database.
app.delete("/delRefreshToken", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.json({ message: "Invalid access token" });
  } else {
    var index = refreshTokensDB.indexOf(token);
    delete refreshTokensDB[index];
    //refreshTokensDB = refreshTokensDB.filter(data => data !== token);
    res.json({ message: "Refresh token deleted successfully" });
  }
});

server.listen(8000, function () {
  console.log("Authentication server is listening on port: 8000");
});
