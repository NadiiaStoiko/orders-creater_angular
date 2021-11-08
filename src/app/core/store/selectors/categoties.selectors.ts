import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { Category } from 'src/app/shared/classes/category';
import { CategoriesStateInteface } from 'src/app/shared/interfaces/categoriesState.interface';
// import { AppStateInteface } from 'src/app/shared/interfaces/appState.interface';

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
