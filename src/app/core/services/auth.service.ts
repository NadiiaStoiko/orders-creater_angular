import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  RegisterRequestInteface,
  RegisterResponseInteface,
} from 'src/app/shared/interfaces/register-state.interface ';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private token?: string = localStorage.getItem('token') || '';
  // private role?: string = localStorage.getItem('userRole') || '';
  private loginUrl = 'http://localhost:8000/login';
  private registerUrl = 'http://localhost:8000/register';
  constructor(private http: HttpClient) {}

  public register(
    user: RegisterRequestInteface
  ): Observable<RegisterResponseInteface> {
    return this.http.post<RegisterResponseInteface>(this.registerUrl, user);
  }

  public login(
    user: RegisterRequestInteface
  ): Observable<{ AccessToken: string; userRole: string }> {
    return this.http.post<{ AccessToken: string; userRole: string }>(
      this.loginUrl,
      user
    );
  }
}

// export class AuthService {
//   private token?: string = localStorage.getItem('token') || '';
//   private role?: string = localStorage.getItem('userRole') || '';
//   private loginUrl = 'http://localhost:8000/login';
//   private registerUrl = 'http://localhost:8000/register';
//   constructor(private http: HttpClient) {}

//   public login(user: User): Observable<{ AccessToken: string }> {
//     return this.http
//       .post<{ AccessToken: string; userRole: string }>(this.loginUrl, user)
//       .pipe(
//         tap(({ AccessToken, userRole }) => {
//           this.setToken(AccessToken);
//           this.setRole(userRole);
//         })
//       );
//   }

//   public register(user: User): Observable<User> {
//     return this.http.post<User>(this.registerUrl, user);
//   }

//   public setToken(token: string): void {
//     this.token = token;
//     localStorage.setItem('token', token);
//   }
//   public setRole(role: string): void {
//     this.role = role;
//     localStorage.setItem('userRole', role);
//   }

//   public isAuth(): boolean {
//     return !!this.token;
//   }

//   public logout(): void {
//     this.setToken('');
//     localStorage.clear();
//   }
// }
