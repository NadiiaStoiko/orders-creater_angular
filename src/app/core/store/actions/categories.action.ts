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

export const deleteCategoryAction = createAction(
  ActionType.DELETE_CATEGORY,
  props<{ id: number }>()
);

export const deleteCategorySuccessAction = createAction(
  ActionType.DELETE_CATEGORY_SUCCESS,
  props<{ id: number }>()
);

export const deleteCategoryFailureAction = createAction(
  ActionType.DELETE_CATEGORY_FAILURE
);

export const addCategoryAction = createAction(
  ActionType.ADD_CATEGORY,
  props<{ category: Category }>()
);

export const addCategorySuccessAction = createAction(
  ActionType.ADD_CATEGORY_SUCCESS,
  props<{ category: Category }>()
);

export const addCategoryFailureAction = createAction(
  ActionType.ADD_CATEGORY_FAILURE,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ errors: any }>()
);

export const editCategoryAction = createAction(
  ActionType.EDIT_CATEGORY,
  props<{ id: number; category: Category }>()
);

export const editCategorySuccessAction = createAction(
  ActionType.EDIT_CATEGORY_SUCCESS,
  props<{ category: Category }>()
);

export const editCategoryFailureAction = createAction(
  ActionType.EDIT_CATEGORY_SUCCESS,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ errors: any }>()
);
