import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Dish } from 'src/app/shared/classes/dish';
import { DishesDataService } from '../../services/dishes-data.service';
import {
  getDishesAction,
  getDishesFailureAction,
  getDishesSuccessAction,
} from '../actions/dishes.action';

@Injectable()
export class GetDishesEffects {
  getDishes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDishesAction),
      switchMap(() => {
        return this.dishesService.getDishes().pipe(
          map((dishes: Dish[]) => {
            console.log(dishes);
            return getDishesSuccessAction({ dishes });
          }),
          catchError(() => of(getDishesFailureAction()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private dishesService: DishesDataService
  ) {}
}
