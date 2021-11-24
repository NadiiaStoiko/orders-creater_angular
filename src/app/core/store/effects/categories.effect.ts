import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Category } from 'src/app/shared/classes/category';
import { CategoriesListService } from '../../services/categories-list.service';
import {
  getCategoriesAction,
  getCategoriesFailureAction,
  getCategoriesSuccessAction,
  deleteCategoryAction,
  deleteCategorySuccessAction,
  deleteCategoryFailureAction,
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
