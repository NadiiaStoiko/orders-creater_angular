/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from '../classes/category';
import { Dish } from '../classes/dish';

export interface CategoriesStateInteface {
  isLoading: boolean;
  errors: any;
  data: Category[];
  isAdded: boolean;
  isUpdated: boolean;
  dishes: Dish[];
}
