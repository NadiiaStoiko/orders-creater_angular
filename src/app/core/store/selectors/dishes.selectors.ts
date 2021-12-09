import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { DishesStateInteface } from 'src/app/shared/interfaces/dishes-state.interface';

export const dishFeatureSelector =
  createFeatureSelector<DishesStateInteface>('dishes');

export const errorSelector = createSelector(
  dishFeatureSelector,
  (dishesState: DishesStateInteface) => dishesState.errors
);

export const isLoadingSelector = createSelector(
  dishFeatureSelector,
  (dishesState: DishesStateInteface) => dishesState.isLoading
);

export const dishesSelector = createSelector(
  dishFeatureSelector,
  (dishesState: DishesStateInteface) => dishesState.data
);

export const dishAddFailureSelector = createSelector(
  dishFeatureSelector,
  (dishesState: DishesStateInteface) => dishesState.errors
);

export const dishEditFailureSelector = createSelector(
  dishFeatureSelector,
  (dishesState: DishesStateInteface) => dishesState.errors
);

export const dishesByIdSelector = createSelector(
  dishFeatureSelector,
  (dishesState: DishesStateInteface) => dishesState.editDish
);

export const isAddedDishSelector = createSelector(
  dishFeatureSelector,
  (dishesState: DishesStateInteface) => dishesState.isAdded
);

export const isUpdateDishSelector = createSelector(
  dishFeatureSelector,
  (dishesState: DishesStateInteface) => dishesState.isUpdated
);

// export const dishesByIdSelector = createSelector(
//   dishesSelector,
//   (data: Dish[], props: any) => {
//     console.log('data', data);
//     return data.find((item) => item.id.toString() === props.id);
//   }
// );
