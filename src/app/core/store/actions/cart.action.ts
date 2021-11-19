import { ActionType } from './cart-action-types ';
import { createAction, props } from '@ngrx/store';
import { Dish } from 'src/app/shared/classes/dish';
import { CartItemInteface } from 'src/app/shared/interfaces/cart-state.interface ';

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
  ActionType.QUANTITY_DEC,
  props<{ id: number }>()
);

export const loadCartFromStateAction = createAction(
  ActionType.LOAD_FROM_STATE,
  props<{ state: CartItemInteface[] }>()
);
