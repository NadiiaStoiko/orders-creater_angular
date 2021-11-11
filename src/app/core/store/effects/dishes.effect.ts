import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Dish } from 'src/app/shared/classes/dish';
import { DishesDataService } from '../../services/dishes-data.service';
import {
  getDishesFailureAction,
  getDishesSuccessAction,
  LoadDishesByCategoryAction,
} from '../actions/dishes.action';

@Injectable()
export class GetDishesEffects {
  getDishes$ = createEffect(() =>
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

// @Injectable()
// export class GetDishByIdEffectes {
//   getDishById$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(getDishByIdAction),
//       switchMap(({ id }) => {
//         console.log(this.dishesService.getDishByID(id));
//         return this.dishesService.getDishByID(id).pipe(
//           map((dish: Dish) => {
//             return getDishAction({ dish });
//           }),
//           catchError(() => of(getDishesFailureAction()))
//         );
//       })
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private dishesService: DishesDataService
//   ) {}
// }
