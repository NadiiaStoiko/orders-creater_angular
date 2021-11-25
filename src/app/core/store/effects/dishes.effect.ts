import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Dish } from 'src/app/shared/classes/dish';
import { DishesDataService } from '../../services/dishes-data.service';
import {
  addDishAction,
  addDishFailureAction,
  addDishSuccessAction,
  deleteDishAction,
  deleteDishFailureAction,
  deleteDishSuccessAction,
  getDishesAction,
  getDishesFailureAction,
  getDishesSuccessAction,
  LoadDishesByCategoryAction,
} from '../actions/dishes.action';

@Injectable()
export class GetDishesEffects {
  getDishesById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadDishesByCategoryAction),
      switchMap(({ categoryId }) => {
        return this.dishesService.getDishes(categoryId).pipe(
          map((dishes: Dish[]) => {
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
@Injectable()
export class GetAllDishesEffects {
  getAllDishesById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDishesAction),
      switchMap(() => {
        return this.dishesService.getAllDishes().pipe(
          map((dishes: Dish[]) => {
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

@Injectable()
export class DeleteDishEffects {
  deleteDish$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteDishAction),
      switchMap(({ id }) => {
        return this.dishesService.deleteDish(id).pipe(
          map(() => {
            return deleteDishSuccessAction({ id });
          }),
          catchError(() => of(deleteDishFailureAction()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private dishesService: DishesDataService
  ) {}
}

@Injectable()
export class AddDishEffects {
  addDish$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDishAction),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      switchMap((dish: any) => {
        console.log('req', dish);
        return this.dishesService.addDish(dish).pipe(
          map((dish) => {
            console.log('res', dish);
            return addDishSuccessAction({ dish });
          }),
          catchError(() => of(addDishFailureAction()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private dishesService: DishesDataService
  ) {}
}
