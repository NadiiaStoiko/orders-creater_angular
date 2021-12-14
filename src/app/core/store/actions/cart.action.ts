import { ActionType } from './cart-action-types ';
import { createAction, props } from '@ngrx/store';
import { Dish } from 'src/app/shared/classes/dish';
import { CartItemInteface } from 'src/app/shared/interfaces/cart-state.interface ';
import { OrderInterface } from 'src/app/shared/interfaces/order.interface ';

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

export const addOrderAction = createAction(
  ActionType.ADD_ORDER,
  props<{ order: OrderInterface }>()
);

export const addOrderSuccessAction = createAction(
  ActionType.ADD_ORDER_SUCCESS,
  props<{ order: OrderInterface }>()
);
export const addOrderFailureAction = createAction(ActionType.ADD_ORDER_FAILURE);

export const getOrderAction = createAction(ActionType.GET_ORDER);

export const getOrderSuccessAction = createAction(
  ActionType.GET_ORDER_SUCCESS,
  props<{ orders: OrderInterface[] }>()
);

export const getOrderFailureAction = createAction(ActionType.GET_ORDER_FAILURE);
