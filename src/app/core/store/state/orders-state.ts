import { OrdersStateInterface } from 'src/app/shared/interfaces/order.interface ';

export const initialState: OrdersStateInterface = {
  orders: [],
  isLoading: false,
  errors: null,
};
