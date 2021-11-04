import { Component, OnInit, OnDestroy } from '@angular/core';
import { DishesDataService } from 'src/app/core/services/dishes-data.service';
import { Dish } from 'src/app/shared/classes/dish';
import { OrderItem } from 'src/app/shared/classes/order-item';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(private dishesServ: DishesDataService) {}
  public dish!: Dish;
  public cartItems: OrderItem[] = [];

  public destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.getDishesFromCart();
  }

  public getDishesFromCart() {
    this.cartItems = this.dishesServ.getDishesFromCart();
    this.cartItems.forEach((element) => {
      this.dishesServ
        .getByID(element.dishId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((dish) => {
          element.dish = dish;
        });
    });
  }

  public changeQuantity(id: number, quantity: number): void {
    const cartItem = this.cartItems.find((item) => item.dishId === id);
    if (!cartItem) return;
    if (cartItem.quantity === 1 && quantity < 0) {
      this.deleteCartItem(id);
    } else {
      this.dishesServ.addDishToCard(cartItem.dish, quantity);
      cartItem.quantity += quantity;
    }
  }

  public deleteCartItem(id: number): void {
    const cartItem = this.cartItems.find((item) => item.dishId === id);
    if (!cartItem) return;
    this.dishesServ.addDishToCard(cartItem.dish, -cartItem.quantity);
    const i = this.cartItems.findIndex((value) => value.dishId == id);
    this.cartItems.splice(i, 1);
  }

  public getTotalCost() {
    return this.cartItems
      .map((product) => product.dish?.price * product.quantity)
      .reduce((acc, value): number => acc + value, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
