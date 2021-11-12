import { Dish } from '../classes/dish';

export interface CartStateInteface {
  dishes: CartItemInteface[];
}

export interface CartItemInteface {
  dish: Dish;
  quantity: number;
}
