import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DishesDataService } from 'src/app/core/services/dishes-data.service';
import {
  getCategoriesAction,
  getIdCategoryByAction,
} from 'src/app/core/store/actions/categories.action';
import { deleteDishAction } from 'src/app/core/store/actions/dishes.action';
import { categoriesStateSelector } from 'src/app/core/store/selectors/categoties.selectors';
import { Dish } from 'src/app/shared/classes/dish';
import { CategoriesStateInteface } from 'src/app/shared/interfaces/categories-state.interface';
import { ViewEncapsulation } from '@angular/core';

export interface TableInfo {
  id: number;
  name: string;
  edit: string;
  delete: string;
}

@Component({
  selector: 'app-dishes-dashboard',
  templateUrl: './dishes-dashboard.component.html',
  styleUrls: ['./dishes-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DishesDashboardComponent implements OnInit {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public dishes$!: Observable<Dish[]>;
  public dataSource: Dish[] = [];
  public categories$!: Observable<CategoriesStateInteface>;
  public categories: any = {};
  public panelOpenState = false;
  public selectedDishes: Dish[] = [];
  public displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];

  constructor(
    public dishesServ: DishesDataService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.categories$ = this.store.pipe(select(categoriesStateSelector));
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.categories = val;
    });
  }

  public fetchData(): void {
    this.store.dispatch(getCategoriesAction());
  }
  public editDish(id: number): void {
    this.router.navigate(['admin-dashboard/add-dishes'], {
      queryParams: { id: id },
    });
    console.log(id);
  }
  public deleteDish(id: number, categoryId: number): void {
    this.store.dispatch(deleteDishAction({ id }));
    console.log(categoryId);
    this.store.dispatch(getIdCategoryByAction({ categoryId }));
  }
  public onSelect(id: number) {
    this.store.dispatch(getIdCategoryByAction({ categoryId: id }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
