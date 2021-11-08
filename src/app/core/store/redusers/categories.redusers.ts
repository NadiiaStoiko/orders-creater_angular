import { Action, createReducer, on } from '@ngrx/store';
import { CategoriesStateInteface } from 'src/app/shared/interfaces/categoriesState.interface';
import {
  getCategoriesAction,
  getCategoriesFailureAction,
  getCategoriesSuccessAction,
} from '../actions/getCategories.action';

const initialState: CategoriesStateInteface = {
  isLoading: false,
  error: null,
  data: [],
};
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

export function reducers(state: CategoriesStateInteface, action: Action) {
  return categoriesReduser(state, action);
}
