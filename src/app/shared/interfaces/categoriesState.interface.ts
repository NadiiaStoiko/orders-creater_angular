import { Category } from '../classes/category';

export interface CategoriesStateInteface {
  isLoading: boolean;
  error: string | null;
  data: Category[];
}
