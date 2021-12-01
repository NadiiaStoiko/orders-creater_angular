import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartItemInteface } from 'src/app/shared/interfaces/cart-state.interface ';
import { AuthService } from '../../services/auth.service';
import { DishesDataService } from '../../services/dishes-data.service';
import { logoutAction } from '../../store/actions/auth.action';
import { isLogginSelector } from '../../store/selectors/auth.selectors ';
import { addToCartSelector } from '../../store/selectors/cart.selectors ';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css'],
})
export class HeaderMenuComponent implements OnInit {
  public totalQuantity = 0;
  public cart$!: Observable<CartItemInteface[]>;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public isLogged = false;

  constructor(
    private dishesServ: DishesDataService,
    private auth: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getTotalQuantity();

    this.store
      .pipe(select(isLogginSelector), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.isLogged = value;
      });
  }

  public getTotalQuantity(): void {
    this.cart$ = this.store.pipe(select(addToCartSelector));
    this.cart$.pipe(takeUntil(this.destroy$)).subscribe((cartItems) => {
      this.totalQuantity = cartItems
        .map((product) => product.quantity)
        .reduce((acc, value): number => acc + value, 0);
    });
  }

  public logout(): void {
    this.router.navigate(['']);
    localStorage.clear();
    this.store.dispatch(logoutAction());
  }
}
