import { ActionType } from './cart-action-types ';
import { createAction, props } from '@ngrx/store';
// import { CartItemStateInteface } from 'src/app/shared/interfaces/cart-state.interface ';
import { Dish } from 'src/app/shared/classes/dish';

export const addToCartAction = createAction(
  ActionType.ADD_TO_CART,
  props<{ dish: Dish }>()
);

export const deleteFromCartAction = createAction(
  ActionType.DELETE_FROM_CART,
  props<{ id: number }>()
);

export const increaseQuantityinCartAction = createAction(
  ActionType.QUANTITY_INC,
  props<{ id: number }>()
);

export const decreaseQuantityinCartAction = createAction(
  ActionType.QUANTITY_INC,
  props<{ id: number }>()
);

// const cartItem = dishes.find((item) => item.dish.id === action.dish.id);
//     if (cartItem) cartItem.quantity++;
