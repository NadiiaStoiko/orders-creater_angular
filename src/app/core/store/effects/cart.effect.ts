import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { map, catchError, switchMap, tap } from 'rxjs/operators';
// import { Dish } from 'src/app/shared/classes/dish';

// import { RegisterRequestInteface } from 'src/app/shared/interfaces/register-state.interface ';
import { AuthService } from '../../services/auth.service';
import { PersistanceService } from '../../services/persistance.service';
import // loginAction,
// loginSuccessAction,
// loginFailureAction,
'../actions/auth.action';
import { addToCartAction } from '../actions/cart.action';

@Injectable()
export class CartEffects {
  cart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addToCartAction),
        tap(({ dish }) => {
          this.persistServ.set('token', dish);
        })
      ),
    { dispatch: true }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistServ: PersistanceService,
    private router: Router
  ) {}
}
