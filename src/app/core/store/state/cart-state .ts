import { Dish } from 'src/app/shared/classes/dish';
import { CartItemStateInteface } from 'src/app/shared/interfaces/cart-state.interface ';

export const CartInitialState: CartItemStateInteface[] = [
  {
    dish: { id: 0 } as Dish,
    quantity: 1,
    // catrgoryID: numbe
  },
];
