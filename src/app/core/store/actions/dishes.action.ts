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

export const addDishAction = createAction(
  ActionsType.ADD_DISH,
  props<{ dish: Dish }>()
);

export const addDishSuccessAction = createAction(
  ActionsType.ADD_DISHES_SUCCESS,
  props<{ dish: Dish }>()
);

export const addDishFailureAction = createAction(
  ActionsType.ADD_FAILURE,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ errors: any }>()
);

export const editDishAction = createAction(
  ActionsType.EDIT_DISH,
  props<{ id: number; dish: Dish }>()
);

export const editDishSuccessAction = createAction(
  ActionsType.EDIT_DISHES_SUCCESS,
  props<{ dish: Dish }>()
);

export const editDishFailureAction = createAction(
  ActionsType.EDIT_FAILURE,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ errors: any }>()
);

export const getDishByIdAction = createAction(
  ActionsType.GET_DISH_BY_ID,
  props<{ dishId: number }>()
);

export const getDishByIdSuccessAction = createAction(
  ActionsType.GET_DISH_BY_ID_SUCCESS,
  props<{ dish: Dish }>()
);

export const getDishByIdFailureAction = createAction(
  ActionsType.EDIT_FAILURE
  // props<{ errors: any }>()
);
