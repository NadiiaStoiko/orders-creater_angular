import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { Dish } from 'src/app/shared/classes/dish';
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
  dishesSelector,
  (data: Dish[], props: any) => {
    return data.find((item) => item.id.toString() === props.id);
  }
);

export const isAddedDishSelector = createSelector(
  dishFeatureSelector,
  (dishesState: DishesStateInteface) => dishesState.isAdded
);

export const isUpdateDishSelector = createSelector(
  dishFeatureSelector,
  (dishesState: DishesStateInteface) => dishesState.isUpdated
);
