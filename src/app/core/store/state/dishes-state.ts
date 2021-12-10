import { DishesStateInteface } from 'src/app/shared/interfaces/dishes-state.interface';

export const initialState: DishesStateInteface = {
  isLoading: false,
  errors: null,
  data: [],
  id: 0,
  isUpdated: false,
  isAdded: false,
  editDish: null,
};
