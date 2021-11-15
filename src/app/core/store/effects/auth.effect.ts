import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
// import { dispatch } from 'rxjs/internal/observable/pairs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
// import { RegisterRequestInteface } from 'src/app/shared/interfaces/register-state.interface ';
// import { User } from 'src/app/shared/classes/user';
import { AuthService } from '../../services/auth.service';
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
            console.log(response);
            return loginSuccessAction({
              AccessToken: response.AccessToken,
              userRole: response.userRole,
            });
          }),
          catchError(() => of(loginFailureAction()))
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
