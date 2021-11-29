import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { PersistanceService } from '../../services/persistance.service';
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
