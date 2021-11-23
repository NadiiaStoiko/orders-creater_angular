import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DishesDataService } from 'src/app/core/services/dishes-data.service';
import {
  deleteDishAction,
  getDishesAction,
} from 'src/app/core/store/actions/dishes.action';
import { dishesSelector } from 'src/app/core/store/selectors/dishes.selectors';
import { Dish } from 'src/app/shared/classes/dish';

@Component({
  selector: 'app-dishes-dashboard',
  templateUrl: './dishes-dashboard.component.html',
  styleUrls: ['./dishes-dashboard.component.css'],
})
export class DishesDashboardComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  dishes$!: Observable<Dish[]>;
  public dishes: Dish[] = [];

  constructor(public dishesServ: DishesDataService, private store: Store) {}

  ngOnInit(): void {
    this.fetchData();
    this.dishes$ = this.store.pipe(select(dishesSelector));
    this.dishes$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.dishes = val;
    });
  }

  public fetchData(): void {
    this.store.dispatch(getDishesAction());
  }
  public editDish(id: number): void {
    console.log(id);
  }
  public deleteDish(id: number): void {
    this.store.dispatch(deleteDishAction({ id }));
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
