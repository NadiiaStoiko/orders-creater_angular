export interface OrderInterface {
  name: string;
  phone: string;
  userID: number | null;
  email: string;
  payment: string;
  address: string;
  delivery: string;
  dishes: any;
  isLoading?: boolean;
}

export interface OrdersStateInterface {
  orders: OrderInterface[];
  isLoading: boolean;
  errors: string | null;
}
