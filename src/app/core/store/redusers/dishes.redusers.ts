import { Action, createReducer, on } from '@ngrx/store';
import { DishesStateInteface } from 'src/app/shared/interfaces/dishes-state.interface';
import {
  getDishesAction,
  getDishesFailureAction,
  getDishesSuccessAction,
} from '../actions/dishes.action';
import { initialState } from '../state/dishes-state';

const dishesReduser = createReducer(
  initialState,
  on(
    getDishesAction,
    (state): DishesStateInteface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    getDishesSuccessAction,
    (state, action): DishesStateInteface => ({
      ...state,
      isLoading: true,
      data: action.dishes,
    })
  ),
  on(
    getDishesFailureAction,
    (state): DishesStateInteface => ({
      ...state,
      isLoading: false,
    })
  )
);

export function reducersForDishes(state: DishesStateInteface, action: Action) {
  return dishesReduser(state, action);
}
