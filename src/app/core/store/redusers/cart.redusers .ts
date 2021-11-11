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

// export interface CartItemInteface {
//   dish: Dish;
//   quantity: number;
// }

// export const cartInitialState: CartItemStateInteface[] = [
//   {
//     dish: { id: 0 } as Dish,
//     quantity: 1,
//   },
// ];

const cartReduser = createReducer(
  cartInitialState,
  on(addToCartAction, (state, action): CartStateInteface => {
    const dishes: CartItemInteface[] = [...state.dishes];
    // console.log(dishes);
    const isDish = dishes.find((item) => item.dish.id === action.dish.id);
    if (isDish) {
      isDish.quantity++;
    } else {
      dishes.push({ dish: action.dish, quantity: 1 });
    }
    // console.log(action.dish);

    // console.log(dishes);
    return {
      ...state,
      dishes,
    };
  }),
  on(deleteFromCartAction, (state, action): CartStateInteface => {
    const dishes: CartItemInteface[] = [...state.dishes];
    // console.log(dishes);
    const dishForDel = dishes.findIndex((item) => item.dish.id === action.id);
    dishes.splice(dishForDel, 1);
    console.log(dishes);

    return {
      ...state,
      dishes,
    };
  }),
  on(increaseQuantityinCartAction, (state, action): CartStateInteface => {
    const dishes: CartItemInteface[] = state.dishes;
    // console.log(dishes);
    console.log('ac', action.id);
    const cartItem = dishes.find((item) => item.dish.id === action.id);
    // console.log(cartItem);
    if (cartItem) {
      console.log(cartItem.dish.quantity);
    }

    return {
      ...state,
      dishes,
    };
  }),
  on(decreaseQuantityinCartAction, (state, action): CartStateInteface => {
    const dishes: CartItemInteface[] = [...state.dishes];
    const cartItem = dishes.find((item) => item.dish.id === action.id);
    if (cartItem) cartItem.quantity--;
    // console.log(dishes);

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
