import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  RegisterRequestInteface,
  RegisterResponseInteface,
} from 'src/app/shared/interfaces/register-state.interface ';
import { environment } from 'src/environments/environment';
import { LoginRequestInteface } from 'src/app/shared/interfaces/login-state.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.authUrl;
  constructor(private http: HttpClient) {}

  public register(
    user: RegisterRequestInteface
  ): Observable<RegisterResponseInteface> {
    return this.http.post<RegisterResponseInteface>(
      `${this.url}/register`,
      user
    );
  }

  public login(user: LoginRequestInteface): Observable<{
    AccessToken: string;
    userRole: string;
    name: string;
    phone: number | null;
    email: string;
    userId: number | null;
  }> {
    return this.http.post<{
      AccessToken: string;
      userRole: string;
      name: string;
      phone: number | null;
      email: string;
      userId: number | null;
    }>(`${this.url}/login`, user);
  }
}
