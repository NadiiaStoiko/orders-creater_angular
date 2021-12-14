import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { OrdersDataService } from '../../services/order.service ';
import { PersistanceService } from '../../services/persistance.service';
import {
  addOrderAction,
  addOrderFailureAction,
  addOrderSuccessAction,
  addToCartAction,
  getOrderAction,
  getOrderFailureAction,
  getOrderSuccessAction,
} from '../actions/cart.action';
// import { OrderInterface } from 'src/app/shared/interfaces/order.interface ';

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

@Injectable()
export class AddOrderEffects {
  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrderAction),
      switchMap((order: any) => {
        console.log('req', order);
        return this.ordersService.addOrder(order).pipe(
          map((order) => {
            console.log('res', order);
            return addOrderSuccessAction({ order });
          }),
          catchError(() => of(addOrderFailureAction()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private ordersService: OrdersDataService
  ) {}
}

@Injectable()
export class GetOrdersEffects {
  getOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrderAction),
      switchMap(() => {
        return this.ordersService.getAllOrders().pipe(
          map((orders) => {
            console.log('res', orders);
            return getOrderSuccessAction({ orders });
          }),
          catchError(() => of(getOrderFailureAction()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private ordersService: OrdersDataService
  ) {}
}
