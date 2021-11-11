import { Action, createReducer, on } from '@ngrx/store';
import {
  CartItemInteface,
  CartStateInteface,
} from 'src/app/shared/interfaces/cart-state.interface ';
import { addToCartAction } from '../actions/cart.action';
import { cartInitialState } from '../state/cart-state ';

// export interface CartItemInteface {
//   dish: Dish;
//   quantity: number;
// }

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

// const dish = cart.find(d => d.id === action.dish.id);
// if (dish) {
//   dish.quantity++;
// } else {
//   cart.push({dish: Action.dish}, quantity: 1)
// }

const cartReduser = createReducer(
  cartInitialState,
  on(addToCartAction, (state, action): CartStateInteface => {
    const dishes: CartItemInteface[] = [...state.dishes];
    console.log(dishes);
    console.log(action.dish);
    dishes.push({ dish: action.dish, quantity: 1 });
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
