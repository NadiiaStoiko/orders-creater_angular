import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
// import { filter } from 'rxjs/operators';
import { Category } from 'src/app/shared/classes/category';
import { CategoriesStateInteface } from 'src/app/shared/interfaces/categories-state.interface';

export const categoryFeatureSelector =
  createFeatureSelector<CategoriesStateInteface>('categories');
export const categoriesFeatureSelector =
  createFeatureSelector<Category[]>('data');

export const errorSelector = createSelector(
  categoryFeatureSelector,
  (categoriesState: CategoriesStateInteface) => categoriesState.errors
);
export const isLoadingSelector = createSelector(
  categoryFeatureSelector,
  (categoriesState: CategoriesStateInteface) => categoriesState.isLoading
);
export const categoriesSelector = createSelector(
  categoryFeatureSelector,
  (categoriesState: CategoriesStateInteface) => categoriesState.data
);
export const categoryAddFailureSelector = createSelector(
  categoryFeatureSelector,
  (categoriesState: CategoriesStateInteface) => categoriesState.errors
);
// const categoties = (state: any) => state.data;
// console.log(categoties);

export const categoryByIdSelector = createSelector(
  categoriesSelector,
  (data: Category[], props: any) => {
    console.log(data);
    return data.filter((item) => item.id === props.id);
  }
);
