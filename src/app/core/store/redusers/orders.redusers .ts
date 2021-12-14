import { Action, createReducer, on } from '@ngrx/store';
import { OrdersStateInterface } from 'src/app/shared/interfaces/order.interface ';
import { getOrderSuccessAction } from '../actions/cart.action';
import { initialState } from '../state/orders-state';

const ordersReduser = createReducer(
  initialState,

  on(
    getOrderSuccessAction,
    (state, action): OrdersStateInterface => ({
      ...state,
      isLoading: true,
      orders: action.orders,
    })
  )
);

export function reducersForOrders(state: OrdersStateInterface, action: Action) {
  return ordersReduser(state, action);
}
