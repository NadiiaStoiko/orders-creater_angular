import { OrderItem } from './order-item';

export class Order {
  id: number;
  date: Date;
  userId: number;
  orderItems: OrderItem[];

  constructor(id: number, userId: number, orderItems: OrderItem[], date: Date) {
    this.id = id;
    this.orderItems = orderItems;
    this.date = date;
    this.userId = userId;
  }
}
