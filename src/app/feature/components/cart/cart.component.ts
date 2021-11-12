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
  public totalCost = 0;
  cart$!: Observable<CartItemInteface[]>;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.addToCart();
    this.cart$.pipe(takeUntil(this.destroy$)).subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.totalCost = cartItems
        .map((product) => product.dish.price * product.quantity)
        .reduce((acc, value): number => acc + value, 0);
    });
  }

  public addToCart(): void {
    this.cart$ = this.store.pipe(select(addToCartSelector));
  }

  public deleteCartItem(id: number): void {
    this.store.dispatch(deleteFromCartAction({ id }));
  }

  public increaseQuantityInCart(id: number): void {
    this.store.dispatch(increaseQuantityinCartAction({ id }));
  }

  public decreaseQuantityInCart(id: number): void {
    this.store.dispatch(decreaseQuantityinCartAction({ id }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
