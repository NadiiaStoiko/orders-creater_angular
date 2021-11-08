import { DishesStateInteface } from 'src/app/shared/interfaces/dishes-state.interface';

export const initialState: DishesStateInteface = {
  isLoading: false,
  error: null,
  data: [],
};
