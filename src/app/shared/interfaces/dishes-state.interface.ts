import { Dish } from '../classes/dish';

export interface DishesStateInteface {
  isLoading: boolean;
  error: string | null;
  data: Dish[];
}
