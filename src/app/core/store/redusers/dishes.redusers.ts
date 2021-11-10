import { Action, createReducer, on } from '@ngrx/store';
import { DishesStateInteface } from 'src/app/shared/interfaces/dishes-state.interface';
import {
  getDishesAction,
  getDishesFailureAction,
  getDishesSuccessAction,
  getDishByIdAction,
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
  ),
  on(
    getDishByIdAction,
    (state, action): DishesStateInteface => ({
      ...state,
      isLoading: false,
      id: action.id,
    })
  )
);

export function reducersForDishes(state: DishesStateInteface, action: Action) {
  return dishesReduser(state, action);
}
