import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
// import { filter } from 'rxjs/operators';
import { Category } from 'src/app/shared/classes/category';
import { CategoriesStateInteface } from 'src/app/shared/interfaces/categories-state.interface';

export const categoryFeatureSelector =
  createFeatureSelector<CategoriesStateInteface>('categories');

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

export const categoryEditFailureSelector = createSelector(
  categoryFeatureSelector,
  (categoriesState: CategoriesStateInteface) => categoriesState.errors
);

export const categoryByIdSelector = createSelector(
  categoriesSelector,
  (data: Category[], props: any) => {
    return data.find((item) => item.id.toString() === props.id);
  }
);

export const isAddCategorySelector = createSelector(
  categoryFeatureSelector,
  (categoriesState: CategoriesStateInteface) => categoriesState.isAdded
);

export const isUpdateCategorySelector = createSelector(
  categoryFeatureSelector,
  (categoriesState: CategoriesStateInteface) => categoriesState.isUpdated
);

export const dishesbyCategorySelector = createSelector(
  categoryFeatureSelector,
  (categoriesState: CategoriesStateInteface) => categoriesState.data
);

export const categoriesStateSelector = createSelector(
  categoryFeatureSelector,
  (categoriesState: CategoriesStateInteface) => categoriesState
);
