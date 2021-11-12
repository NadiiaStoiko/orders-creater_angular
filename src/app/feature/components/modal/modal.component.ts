import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Dish } from 'src/app/shared/classes/dish';
import { DishesDataService } from 'src/app/core/services/dishes-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { addToCartAction } from 'src/app/core/store/actions/cart.action';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  public dish!: Dish;
  public dishes: Dish[] = [];
  public destroy$: Subject<boolean> = new Subject<boolean>();
  dish$!: Observable<Dish>;
  dishes$!: Observable<Dish[]>;

  constructor(
    private dishesServ: DishesDataService,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: Dish
  ) {}

  ngOnInit(): void {
    console.log(this.dishes);
  }

  public addDishToCart(dish: Dish): void {
    this.store.dispatch(addToCartAction({ dish }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
