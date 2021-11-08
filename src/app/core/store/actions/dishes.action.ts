import { ActionsType } from './dishes-action-types';
import { createAction, props } from '@ngrx/store';
import { Dish } from 'src/app/shared/classes/dish';

export const getDishesAction = createAction(ActionsType.GET_DISHES);

export const getDishesSuccessAction = createAction(
  ActionsType.GET_DISHES_SUCCESS,
  props<{ dishes: Dish[] }>()
);
export const getDishesFailureAction = createAction(
  ActionsType.GET_DISHES_FAILURE
);
