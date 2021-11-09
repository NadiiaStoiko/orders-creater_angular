require("dotenv").config();

const express = require("express");
const http = require("http");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app);

app.use(express.json());

// When this server gets an API call in '/greet' endpoint,
// it will call the 'AuthenticateAccessToken' function.
// After successful authentication, the 3rd parameter in app.get()
// i.e, the anonymous function, will get executed.
app.get("/greet", AuthenticateAccessToken, (req, res) => {
  res.json({ message: "Whola...you are authorized to access this API" });
});

function AuthenticateAccessToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.json({ message: "Invalid access token" });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.json({ message: "Some error occured" });
      } else {
        next();
      }
    });
  }
}

server.listen(4000, function () {
  console.log("Resource server is listening on port: 4000");
});
