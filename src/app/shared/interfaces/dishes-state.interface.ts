/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dish } from '../classes/dish';

export interface DishesStateInteface {
  isLoading: boolean;
  errors: any;
  data: Dish[];
  id: number;
}
