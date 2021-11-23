import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  RegisterRequestInteface,
  RegisterResponseInteface,
} from 'src/app/shared/interfaces/register-state.interface ';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private logUrl = environment.loginUrl;
  private regUrl = environment.registerUrl;
  constructor(private http: HttpClient) {}

  public register(
    user: RegisterRequestInteface
  ): Observable<RegisterResponseInteface> {
    return this.http.post<RegisterResponseInteface>(this.regUrl, user);
  }

  public login(user: RegisterRequestInteface): Observable<{
    AccessToken: string;
    userRole: string;
    name: string;
    phone: number | null;
  }> {
    return this.http.post<{
      AccessToken: string;
      userRole: string;
      name: string;
      phone: number | null;
    }>(this.logUrl, user);
  }
}
