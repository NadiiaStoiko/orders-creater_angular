import { ActionType } from './cart-action-types ';
import { createAction, props } from '@ngrx/store';
import { CartItemStateInteface } from 'src/app/shared/interfaces/cart-state.interface ';

// export const addToCartAction = createAction(ActionType.ADD_TO_CART);

export const addToCartAction = createAction(
  ActionType.ADD_TO_CART,
  props<{ item: CartItemStateInteface }>()
);
