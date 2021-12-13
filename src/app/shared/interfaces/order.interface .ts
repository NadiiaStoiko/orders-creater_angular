// import { CartStateInteface } from './cart-state.interface ';

export interface OrderInterface {
  name: string;
  phone: string;
  userID: number | null;
  email: string;
  payment: string;
  address: string;
  delivery: string;
  dishes: any;
}
