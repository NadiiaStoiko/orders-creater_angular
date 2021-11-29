import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dish } from 'src/app/shared/classes/dish';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DishesDataService } from 'src/app/core/services/dishes-data.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { getDishesAction } from 'src/app/core/store/actions/dishes.action';
import { addToCartAction } from 'src/app/core/store/actions/cart.action';
import {
  dishesSelector,
  errorSelector,
} from 'src/app/core/store/selectors/dishes.selectors';
@Component({
  selector: 'app-dishes-by-categories',
  templateUrl: './dishes-by-categories.component.html',
  styleUrls: ['./dishes-by-categories.component.css'],
})
export class DishesByCategoriesComponent implements OnInit, OnDestroy {
  public dishes: Dish[] = [];
  public destroy$: Subject<boolean> = new Subject<boolean>();

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  dishes$!: Observable<Dish[]>;

  constructor(
    public dishesServ: DishesDataService,
    public dialog: MatDialog,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.fetchData();

    this.dishes$ = this.store.pipe(select(dishesSelector));
    this.dishes$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.dishes = val;
    });
    this.error$ = this.store.pipe(select(errorSelector));
  }

  public fetchData(): void {
    this.store.dispatch(getDishesAction());
  }

  public openDialog(dish: Dish): void {
    this.dialog.open(ModalComponent, { data: dish });
  }

  public addDishToCart(dish: Dish): void {
    this.store.dispatch(addToCartAction({ dish }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
