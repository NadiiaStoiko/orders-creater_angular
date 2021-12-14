import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';
import { OrdersStateInterface } from 'src/app/shared/interfaces/order.interface ';

export const ordersFeatureSelector =
  createFeatureSelector<OrdersStateInterface>('orders');

export const ordersErrorSelector = createSelector(
  ordersFeatureSelector,
  (ordersState: OrdersStateInterface) => ordersState.errors
);

export const ordersIsLoadingSelector = createSelector(
  ordersFeatureSelector,
  (ordersState: OrdersStateInterface) => ordersState.isLoading
);

export const ordersSelector = createSelector(
  ordersFeatureSelector,
  (ordersState) => ordersState.orders
);
