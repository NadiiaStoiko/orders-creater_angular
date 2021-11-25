import { Action, createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/shared/classes/category';
import { CategoriesStateInteface } from 'src/app/shared/interfaces/categories-state.interface';
import {
  addCategoryFailureAction,
  addCategorySuccessAction,
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
    const categories: Category[] = [...state.data];
    console.log('categor', categories);
    const catForDel = categories.findIndex((item) => item.id === action.id);
    categories.splice(catForDel, 1);
    return {
      ...state,
      isLoading: true,
      data: categories,
    };
  }),
  on(addCategorySuccessAction, (state, action): CategoriesStateInteface => {
    console.log('action', action.category);
    const categories: Category[] = [...state.data];
    console.log('categories', categories);
    categories.push(action.category);
    console.log('2', categories);
    return {
      ...state,
      isLoading: true,
      data: categories,
    };
  }),
  on(
    addCategoryFailureAction,
    (state, action): CategoriesStateInteface => ({
      ...state,
      errors: action.errors,
    })
  )
);

export function reducersForCategories(
  state: CategoriesStateInteface,
  action: Action
) {
  return categoriesReduser(state, action);
}
