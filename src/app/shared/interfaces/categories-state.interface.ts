/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from '../classes/category';

export interface CategoriesStateInteface {
  isLoading: boolean;
  errors: any;
  data: Category[];
  isAdded: boolean;
  isUpdated: boolean;
}
