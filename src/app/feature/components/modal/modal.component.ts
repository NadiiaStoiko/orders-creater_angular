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
    // this.getDishes();
    // this.dishes$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
    //   this.dishes = val;
    //   console.log(this.dishes);
    // });
    // // this.fetchData(this.dish);
    // console.log('data', this.data);
    // this.getDish();
  }

  public addDishToCart(dish: Dish): void {
    this.store.dispatch(addToCartAction({ dish }));
    console.log(dish);
  }

  // public getDishes(): void {
  //   this.dishes$ = this.store.pipe(select(dishesSelector));
  // }

  // public getId(): void {
  //   this.dishes$ = this.store.pipe(select(dishesSelector));
  // }

  // public addDishToCart(): void {
  //   this.dishesServ.addDishToCard(this.dish);
  // }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
