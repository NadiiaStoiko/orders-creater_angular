import { Action, createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/shared/classes/category';
import { Dish } from 'src/app/shared/classes/dish';
import { CategoriesStateInteface } from 'src/app/shared/interfaces/categories-state.interface';
import {
  addCategoryFailureAction,
  addCategorySuccessAction,
  deleteCategorySuccessAction,
  editCategorySuccessAction,
  // deleteCategortAction,
  getCategoriesAction,
  getCategoriesFailureAction,
  getCategoriesSuccessAction,
  getIdCategorySuccessAction,
  // getCategoryByIdSuccessAction,
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
    const categories: Category[] = [...state.data];
    categories.push(action.category);
    console.log('2', categories);
    return {
      ...state,
      isLoading: true,
      data: categories,
      isAdded: true,
    };
  }),
  on(
    addCategoryFailureAction,
    (state, action): CategoriesStateInteface => ({
      ...state,
      errors: action.errors,
    })
  ),
  on(editCategorySuccessAction, (state): CategoriesStateInteface => {
    return {
      ...state,
      isLoading: true,
      isUpdated: true,
    };
  }),
  on(getIdCategorySuccessAction, (state, action): CategoriesStateInteface => {
    const categoriesData: Category[] = [...state.data];
    const dishes: Dish[] = action.dishes;
    const id: number = action.id;
    const categories = categoriesData.map((category) => {
      if (category.id === id) {
        category.dishes = dishes;
      }
      return category;
    });
    console.log('dishes', dishes);
    console.log('categ', categories);
    return {
      ...state,
      data: categories,
    };
  })
);

export function reducersForCategories(
  state: CategoriesStateInteface,
  action: Action
) {
  return categoriesReduser(state, action);
}
