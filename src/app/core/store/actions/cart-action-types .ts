export enum ActionType {
  ADD_TO_CART = '[Cart] Add to cart',
  DELETE_FROM_CART = '[Cart] Delete from cart',
  QUANTITY_INC = '[Cart] Quantity increase',
  QUANTITY_DEC = '[Cart] Quantity decrease',
  LOAD_FROM_STATE = '[Cart] Load cart from state',

  ADD_ORDER = '[Cart] Add order',
  ADD_ORDER_SUCCESS = '[Cart] Add order success',
  ADD_ORDER_FAILURE = '[Cart] Add order failure',

  GET_ORDER = '[Cart] Gets order',
  GET_ORDER_SUCCESS = '[Cart] Get orders success',
  GET_ORDER_FAILURE = '[Cart] Get orders failure',
}
