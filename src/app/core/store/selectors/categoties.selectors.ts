import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { CategoriesStateInteface } from 'src/app/shared/interfaces/categories-state.interface';

export const categoryFeatureSelector =
  createFeatureSelector<CategoriesStateInteface>('categories');

export const errorSelector = createSelector(
  categoryFeatureSelector,
  (categoriesState: CategoriesStateInteface) => categoriesState.error
);
export const isLoadingSelector = createSelector(
  categoryFeatureSelector,
  (categoriesState: CategoriesStateInteface) => categoriesState.isLoading
);
export const categoriesSelector = createSelector(
  categoryFeatureSelector,
  (categoriesState: CategoriesStateInteface) => categoriesState.data
);
