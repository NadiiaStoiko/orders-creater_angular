import { ActionType } from './cart-action-types ';
import { createAction, props } from '@ngrx/store';
// import { CartItemStateInteface } from 'src/app/shared/interfaces/cart-state.interface ';
import { Dish } from 'src/app/shared/classes/dish';

export const addToCartAction = createAction(
  ActionType.ADD_TO_CART,
  props<{ dish: Dish }>()
);
