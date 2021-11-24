import { ActionsType } from './dishes-action-types';
import { createAction, props } from '@ngrx/store';
import { Dish } from 'src/app/shared/classes/dish';

export const getDishesAction = createAction(ActionsType.GET_DISHES);

export const getDishesSuccessAction = createAction(
  ActionsType.GET_DISHES_SUCCESS,
  props<{ dishes: Dish[] }>()
);

export const getDishesFailureAction = createAction(ActionsType.GET_FAILURE);

export const LoadDishesByCategoryAction = createAction(
  ActionsType.LOAD_DISHES_BY_CATEGORY,
  props<{ categoryId: number }>()
);

export const deleteDishAction = createAction(
  ActionsType.DELETE_DISHES,
  props<{ id: number }>()
);

export const deleteDishSuccessAction = createAction(
  ActionsType.DELETE_DISHES_SUCCESS,
  props<{ id: number }>()
);

export const deleteDishFailureAction = createAction(ActionsType.DELETE_FAILURE);
