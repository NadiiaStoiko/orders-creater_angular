import { Component, OnDestroy } from '@angular/core';
import { DishesDataService } from 'src/app/core/services/dishes-data.service';
import { Subject, Observable } from 'rxjs';
import { CartItemInteface } from 'src/app/shared/interfaces/cart-state.interface ';
import { addToCartSelector } from 'src/app/core/store/selectors/cart.selectors ';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import {
  decreaseQuantityinCartAction,
  deleteFromCartAction,
  increaseQuantityinCartAction,
} from 'src/app/core/store/actions/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnDestroy {
  constructor(private dishesServ: DishesDataService, private store: Store) {}

  public cartItems: CartItemInteface[] = [];
  cart$!: Observable<CartItemInteface[]>;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    console.log();
    this.addToCart();
    this.cart$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.cartItems = val;
      // console.log(val);
    });

    // this.getDishesFromCart();
  }

  public addToCart(): void {
    this.cart$ = this.store.pipe(select(addToCartSelector));
  }

  // public getDishesFromCart() {
  //   this.cartItems = this.dishesServ.getDishesFromCart();
  //   this.cartItems.forEach((element) => {
  //     this.dishesServ
  //       .getByID(element.dishId)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe((dish) => {
  //         element.dish = dish;
  //       });
  //   });
  // }

  // public changeQuantity(id: number, quantity: number): void {
  //   const cartItem = this.cartItems.find((item) => item.dishId === id);
  //   if (!cartItem) return;

  //   if (cartItem.quantity === 1 && quantity < 0) {
  //     this.deleteCartItem(id);
  //   } else {
  //     this.dishesServ.addDishToCard(cartItem.dish, quantity);
  //     cartItem.quantity += quantity;
  //   }
  // }

  // public deleteCartItem(id: number): void {
  //   const cartItem = this.cartItems.find((item) => item.dishId === id);
  //   if (!cartItem) return;
  //   this.dishesServ.addDishToCard(cartItem.dish, -cartItem.quantity);
  //   const i = this.cartItems.findIndex((value) => value.dishId == id);
  //   this.cartItems.splice(i, 1);
  // }
  public deleteCartItem(id: number): void {
    this.store.dispatch(deleteFromCartAction({ id }));
  }

  public increaseQuantityInCart(id: number): void {
    this.store.dispatch(increaseQuantityinCartAction({ id }));
  }

  public decreaseQuantityInCart(id: number): void {
    this.store.dispatch(decreaseQuantityinCartAction({ id }));
  }

  // public getTotalCost() {
  //   return this.cartItems
  //     .map((product) => product.dish?.price * product.quantity)
  //     .reduce((acc, value): number => acc + value, 0);
  // }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
