import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { CartStateInteface } from 'src/app/shared/interfaces/cart-state.interface ';

export const cartFeatureSelector =
  createFeatureSelector<CartStateInteface>('cart');

export const addToCartSelector = createSelector(
  cartFeatureSelector,
  (cartState: CartStateInteface) => cartState.dishes
);
