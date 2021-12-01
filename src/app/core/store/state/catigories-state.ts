import { CategoriesStateInteface } from 'src/app/shared/interfaces/categories-state.interface';

export const initialState: CategoriesStateInteface = {
  isLoading: false,
  errors: null,
  data: [],
  isAdded: false,
  isUpdated: false,
  dishes: [],
};
