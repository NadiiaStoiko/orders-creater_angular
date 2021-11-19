import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { loadCartFromStateAction } from '../store/actions/cart.action';
import { dishesFromCartSelector } from '../store/selectors/cart.selectors ';

@Injectable({
  providedIn: 'root',
})
export class CartStorageSyncService {
  private isInit = false;
  public LocalStorageKey = 'cart';

  constructor(private store$: Store) {}

  public init() {
    if (this.isInit) {
      return;
    }
    this.isInit = true;
    this.loadFromStorage();

    this.store$
      .pipe(
        select(dishesFromCartSelector),
        filter((state) => !!state)
      )
      .subscribe((state) => {
        localStorage.setItem(this.LocalStorageKey, JSON.stringify(state));
      });
  }

  public loadFromStorage() {
    const storageState = localStorage.getItem(this.LocalStorageKey);

    if (storageState) {
      console.log(JSON.parse(storageState));
      this.store$.dispatch(
        loadCartFromStateAction({ state: JSON.parse(storageState) })
      );
    }
  }
}
