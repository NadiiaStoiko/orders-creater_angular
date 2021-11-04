import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/classes/user';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token?: string = localStorage.getItem('token') || '';
  private role?: string = localStorage.getItem('userRole') || '';
  private loginUrl = 'http://localhost:8000/login';
  private registerUrl = 'http://localhost:8000/register';
  constructor(private http: HttpClient) {}

  public login(user: User): Observable<{ AccessToken: string }> {
    return this.http
      .post<{ AccessToken: string; userRole: string }>(this.loginUrl, user)
      .pipe(
        tap(({ AccessToken, userRole }) => {
          this.setToken(AccessToken);
          this.setRole(userRole);
        })
      );
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user);
  }

  public setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }
  public setRole(role: string): void {
    this.role = role;
    localStorage.setItem('userRole', role);
  }

  public isAuth(): boolean {
    return !!this.token;
  }

  public logout(): void {
    this.setToken('');
    localStorage.clear();
  }
}
