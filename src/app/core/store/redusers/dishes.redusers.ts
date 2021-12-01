import { Action, createReducer, on } from '@ngrx/store';
import { Dish } from 'src/app/shared/classes/dish';
import { DishesStateInteface } from 'src/app/shared/interfaces/dishes-state.interface';
import {
  addDishFailureAction,
  addDishSuccessAction,
  deleteDishSuccessAction,
  editDishFailureAction,
  editDishSuccessAction,
  // editDishSuccessAction,
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
  ),
  on(deleteDishSuccessAction, (state, action): DishesStateInteface => {
    console.log(action.id);
    const dishes: Dish[] = [...state.data]; //filter
    console.log('dishes', dishes);
    const dishForDel = dishes.findIndex((item) => item.id === action.id);
    dishes.splice(dishForDel, 1);
    return {
      ...state,
      isLoading: true,
      data: dishes,
    };
  }),
  on(addDishSuccessAction, (state, action): DishesStateInteface => {
    const dishes: Dish[] = [...state.data];
    dishes.push(action.dish);
    return {
      ...state,
      isLoading: false,
      isAdded: true,
      data: dishes,
    };
  }),
  on(
    addDishFailureAction,
    (state, action): DishesStateInteface => ({
      ...state,
      errors: action.errors,
    })
  ),
  on(editDishSuccessAction, (state): DishesStateInteface => {
    return {
      ...state,
      isUpdated: true,
    };
  }),
  on(
    editDishFailureAction,
    (state, action): DishesStateInteface => ({
      ...state,
      errors: action.errors,
    })
  )
);

export function reducersForDishes(state: DishesStateInteface, action: Action) {
  return dishesReduser(state, action);
}
