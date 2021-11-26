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
