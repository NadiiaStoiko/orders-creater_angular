import { Dish } from '../classes/dish';

export interface DishesStateInteface {
  isLoading: boolean;
  error: string | null;
  data: Dish[];
  id: number;
}

// export interface CartItem {
//   dish: Dish,
//   quantity: number
// }

// const cart: CartItem[] = [
//   {
//     dish: ({id: 10} as Dish),
//     quantity: 1
//   }
// ]

// const dish = cart.find(d => d.id === action.dish.id);
// if (dish) {
//   dish.quantity++;
// } else {
//   cart.push({dish: Action.dish}, quantity: 1)
// }
