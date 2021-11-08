import { Action, createReducer, on } from '@ngrx/store';
import { CategoriesStateInteface } from 'src/app/shared/interfaces/categories-state.interface';
import {
  getCategoriesAction,
  getCategoriesFailureAction,
  getCategoriesSuccessAction,
} from '../actions/categories.action';
import { initialState } from '../state/catigories-state';

const categoriesReduser = createReducer(
  initialState,
  on(
    getCategoriesAction,
    (state): CategoriesStateInteface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    getCategoriesSuccessAction,
    (state, action): CategoriesStateInteface => ({
      ...state,
      isLoading: true,
      data: action.category,
    })
  ),
  on(
    getCategoriesFailureAction,
    (state): CategoriesStateInteface => ({
      ...state,
      isLoading: false,
    })
  )
);

export function reducersForCategories(
  state: CategoriesStateInteface,
  action: Action
) {
  return categoriesReduser(state, action);
}
