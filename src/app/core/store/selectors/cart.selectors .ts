import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { CartStateInteface } from 'src/app/shared/interfaces/cart-state.interface ';

export const cartFeatureSelector =
  createFeatureSelector<CartStateInteface>('cart');

// export const errorSelector = createSelector(
//   dishFeatureSelector,
//   (dishesState: DishesStateInteface) => dishesState.error
// );
// export const isLoadingSelector = createSelector(
//   dishFeatureSelector,
//   (dishesState: DishesStateInteface) => dishesState.isLoading
// );
export const addToCartSelector = createSelector(
  cartFeatureSelector,
  (cartState: CartStateInteface) => cartState.dishes
);
