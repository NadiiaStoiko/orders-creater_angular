/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dish } from '../classes/dish';

export interface DishesStateInteface {
  isLoading: boolean;
  errors: string | null;
  data: Dish[];
  id: number;
  isUpdated: boolean;
  isAdded: boolean;
  editDish?: Dish;
}
