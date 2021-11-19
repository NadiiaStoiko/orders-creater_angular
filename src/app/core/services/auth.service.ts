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
