import { Dish } from './dish';

export class OrderItem {
  id: number;
  dishId: number;
  quantity: number;
  dish: Dish;

  constructor(id: number, dishId: number, quantity: number, dish: Dish) {
    this.id = id;
    this.quantity = quantity;
    this.dishId = dishId;
    this.dish = dish;
  }
}
