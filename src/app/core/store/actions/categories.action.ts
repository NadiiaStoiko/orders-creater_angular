import { ActionType } from './categories-list-action-types';
import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/shared/classes/category';

export const getCategoriesAction = createAction(ActionType.GET_CATEGORIES);

export const getCategoriesSuccessAction = createAction(
  ActionType.GET_CATEGORIES_SUCCESS,
  props<{ category: Category[] }>()
);
export const getCategoriesFailureAction = createAction(
  ActionType.GET_CATEGORIES_FAILURE
);

export const getCategoriesByIdAction = createAction(
  ActionType.GET_CATEGORIES_BY_ID
);

export const getCategoriesByIdSuccessAction = createAction(
  ActionType.GET_CATEGORIES_BY_ID_SUCCESS,
  props<{ categoryID: number }>()
);
export const getCategoriesByIdFailureAction = createAction(
  ActionType.GET_CATEGORIES_BY_ID_FAILURE
);
