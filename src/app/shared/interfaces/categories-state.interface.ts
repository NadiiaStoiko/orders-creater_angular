/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from '../classes/category';

export interface CategoriesStateInteface {
  [x: string]: any;
  isLoading: boolean;
  errors: any;
  data: Category[];
  edit: Category | null;
}
