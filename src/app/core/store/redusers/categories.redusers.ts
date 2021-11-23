import { Action, createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/shared/classes/category';
import { CategoriesStateInteface } from 'src/app/shared/interfaces/categories-state.interface';
import {
  deleteCategorySuccessAction,
  // deleteCategortAction,
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
  ),
  on(deleteCategorySuccessAction, (state, action): CategoriesStateInteface => {
    console.log(action.id);
    const categor: Category[] = [...state.data];
    console.log('categor', categor);
    const catForDel = categor.findIndex((item) => item.id === action.id);
    categor.splice(catForDel, 1);
    return {
      ...state,
      isLoading: true,
      data: categor,
    };
  })
);

export function reducersForCategories(
  state: CategoriesStateInteface,
  action: Action
) {
  return categoriesReduser(state, action);
}
