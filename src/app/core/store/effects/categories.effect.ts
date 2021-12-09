import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Category } from 'src/app/shared/classes/category';
import { Dish } from 'src/app/shared/classes/dish';
import { CategoriesListService } from '../../services/categories-list.service';
import { DishesDataService } from '../../services/dishes-data.service';
import {
  getCategoriesAction,
  getCategoriesFailureAction,
  getCategoriesSuccessAction,
  deleteCategoryAction,
  deleteCategorySuccessAction,
  deleteCategoryFailureAction,
  addCategoryAction,
  addCategorySuccessAction,
  addCategoryFailureAction,
  editCategoryAction,
  editCategorySuccessAction,
  editCategoryFailureAction,
  getIdCategoryByAction,
  getIdCategorySuccessAction,
} from '../actions/categories.action';

@Injectable()
export class GetCategoriesEffects {
  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategoriesAction),
      switchMap(() => {
        return this.categoriesService.getCategories().pipe(
          map((category: Category[]) => {
            return getCategoriesSuccessAction({ category });
          }),
          catchError(() => of(getCategoriesFailureAction()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesListService
  ) {}
}

@Injectable()
export class DeleteCategoryEffects {
  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCategoryAction),
      switchMap(({ id }) => {
        return this.categoriesService.deleteCategory(id).pipe(
          map(() => {
            return deleteCategorySuccessAction({ id });
          }),
          catchError(() => of(deleteCategoryFailureAction))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesListService
  ) {}
}
@Injectable()
export class AddCategoryEffects {
  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCategoryAction),
      switchMap((category: any) => {
        console.log('req', category);
        return this.categoriesService.addCategory(category).pipe(
          map((category) => {
            console.log('res', category);
            return addCategorySuccessAction({ category });
          }),
          catchError((errorResponse) =>
            of(addCategoryFailureAction({ errors: errorResponse.statusText }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesListService
  ) {}
}

@Injectable()
export class EditCategoryEffects {
  editCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editCategoryAction),
      switchMap(({ category, id }) => {
        console.log('req', id);
        console.log('req', category);
        return this.categoriesService.updateCategory(id, category).pipe(
          map((category) => {
            console.log('res', category);
            return editCategorySuccessAction({ category });
          }),
          catchError((errorResponse) =>
            of(editCategoryFailureAction({ errors: errorResponse.statusText }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesListService
  ) {}
}

@Injectable()
export class SelecedCategoryEffects {
  selectedCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getIdCategoryByAction),
      switchMap(({ categoryId }) => {
        console.log('id', categoryId);
        return this.dishesService.getDishes(categoryId).pipe(
          map((dishes: Dish[]) => {
            return getIdCategorySuccessAction({ dishes, id: categoryId });
          })
          // catchError(() => of(getIdCategorySuccessAction))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private dishesService: DishesDataService
  ) {}
}
