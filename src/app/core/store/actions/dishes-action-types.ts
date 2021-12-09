export enum ActionsType {
  GET_DISHES = '[Dishes] Get dishes',
  GET_DISHES_SUCCESS = '[Dishes] Get dishes success',
  GET_FAILURE = '[Dishes] Get dishes failure',
  LOAD_DISHES_BY_CATEGORY = '[Dishes] Load dishes on select category',

  GET_DISH_BY_ID = '[Dishes] Get dish by id',
  GET_DISH_BY_ID_SUCCESS = '[Dishes] Get dish by id success',
  GET_DISH_BY_ID_FAILURE = '[Dishes] Get dish by id failure',

  DELETE_DISHES = '[Dishes] Delete dish',
  DELETE_DISHES_SUCCESS = '[Dishes] Delete dish success',
  DELETE_FAILURE = '[Dishes] Delete dish failure',

  ADD_DISH = '[Dishes] Add dish',
  ADD_DISHES_SUCCESS = '[Dishes] Add dish success',
  ADD_FAILURE = '[Dishes] Add dish failure',

  EDIT_DISH = '[Dishes] Edit dish',
  EDIT_DISHES_SUCCESS = '[Dishes] Edit dish success',
  EDIT_FAILURE = '[Dishes] Edit dish failure',
}
