import { Action, createReducer, on } from '@ngrx/store';
import {
  CartItemInteface,
  CartStateInteface,
} from 'src/app/shared/interfaces/cart-state.interface ';
import {
  addToCartAction,
  decreaseQuantityinCartAction,
  deleteFromCartAction,
  increaseQuantityinCartAction,
} from '../actions/cart.action';
import { cartInitialState } from '../state/cart-state ';

const cartReduser = createReducer(
  cartInitialState,
  on(addToCartAction, (state, action): CartStateInteface => {
    const dishes: CartItemInteface[] = [...state.dishes];
    const isDish = dishes.find((item) => item.dish.id === action.dish.id);
    if (isDish) {
      isDish.quantity++;
    } else {
      dishes.push({ dish: action.dish, quantity: 1 });
    }
    return {
      ...state,
      dishes,
    };
  }),
  on(deleteFromCartAction, (state, action): CartStateInteface => {
    const dishes: CartItemInteface[] = [...state.dishes];
    const dishForDel = dishes.findIndex((item) => item.dish.id === action.id);
    dishes.splice(dishForDel, 1);
    console.log(dishes);

    return {
      ...state,
      dishes,
    };
  }),
  on(increaseQuantityinCartAction, (state, action): CartStateInteface => {
    const dishes: CartItemInteface[] = [...state.dishes];
    const cartItem = dishes.find((item) => item.dish.id === action.id);
    if (cartItem) {
      cartItem.quantity++;
    }

    return {
      ...state,
      dishes,
    };
  }),
  on(decreaseQuantityinCartAction, (state, action): CartStateInteface => {
    const dishes: CartItemInteface[] = [...state.dishes];
    const cartItem = dishes.find((item) => item.dish.id === action.id);
    if (cartItem) {
      cartItem.quantity > 1 ? cartItem.quantity-- : (cartItem.quantity = 1);
    }

    return {
      ...state,
      dishes,
    };
  })
);

export function reducersForCart(
  state: CartStateInteface,
  action: Action
): CartStateInteface {
  return cartReduser(state, action);
}
