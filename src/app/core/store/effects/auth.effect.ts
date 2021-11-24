import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { PersistanceService } from '../../services/persistance.service';
import {
  registerAction,
  registerSuccessAction,
  registerFailureAction,
  loginAction,
  loginSuccessAction,
  loginFailureAction,
} from '../actions/auth.action';

@Injectable()
export class RegisterEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      switchMap((request: any) => {
        console.log(request);
        return this.authService.register(request).pipe(
          map((response) => {
            console.log(response);
            return registerSuccessAction({ response });
          }),
          catchError(() => of(registerFailureAction()))
        );
      })
    )
  );

  redirectAfterRegister$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      switchMap((request: any) => {
        console.log(request);
        return this.authService.login(request).pipe(
          map((response) => {
            this.persistServ.set('token', response.AccessToken);
            this.persistServ.set('userRole', response.userRole);
            this.persistServ.set('userName', response.name);
            console.log(response);
            return loginSuccessAction({
              AccessToken: response.AccessToken,
              userRole: response.userRole,
              name: response.name,
              phone: response.phone,
            });
          }),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          catchError((errorResponse) => {
            console.log(errorResponse);
            return of(loginFailureAction({ errors: errorResponse.message }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistServ: PersistanceService,
    private router: Router
  ) {}
}
