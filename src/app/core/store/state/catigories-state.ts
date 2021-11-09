import { CategoriesStateInteface } from 'src/app/shared/interfaces/categories-state.interface';

export const initialState: CategoriesStateInteface = {
  isLoading: false,
  error: null,
  data: [],
  // catrgoryID: number,
};
