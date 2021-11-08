import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { DishesStateInteface } from 'src/app/shared/interfaces/dishes-state.interface';
// import { AppStateInteface } from 'src/app/shared/interfaces/appState.interface';

export const dishFeatureSelector =
  createFeatureSelector<DishesStateInteface>('dishes');

export const errorSelector = createSelector(
  dishFeatureSelector,
  (dishesState: DishesStateInteface) => dishesState.error
);
export const isLoadingSelector = createSelector(
  dishFeatureSelector,
  (dishesState: DishesStateInteface) => dishesState.isLoading
);
export const dishesSelector = createSelector(
  dishFeatureSelector,
  (dishesState: DishesStateInteface) => dishesState.data
);
