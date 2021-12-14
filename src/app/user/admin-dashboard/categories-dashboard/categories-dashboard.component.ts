import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  deleteCategoryAction,
  getCategoriesAction,
} from 'src/app/core/store/actions/categories.action';
import { categoriesSelector } from 'src/app/core/store/selectors/categoties.selectors';
import { Category } from 'src/app/shared/classes/category';
export interface TableInfo {
  id: number;
  name: string;
  edit: string;
  delete: string;
}
@Component({
  selector: 'app-categories-dashboard',
  templateUrl: './categories-dashboard.component.html',
  styleUrls: ['./categories-dashboard.component.css'],
})
export class CategoriesDashboardComponent implements OnInit {
  categories$!: Observable<Category[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public categories: Category[] = [];
  public displayedColumns: string[] = ['id', 'name', 'edit', 'delete'];

  constructor(private store: Store, private router: Router) {
    console.log;
  }

  ngOnInit(): void {
    this.fetchData();
    this.categories$ = this.store.pipe(select(categoriesSelector));
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.categories = val;
      console.log(val);
    });
  }

  public fetchData(): void {
    this.store.dispatch(getCategoriesAction());
  }
  public editCategory(id: number) {
    this.router.navigate(['admin-dashboard/add-categories'], {
      queryParams: { id: id },
    });
    console.log(id);
  }
  public deleteCategory(id: number) {
    this.store.dispatch(deleteCategoryAction({ id }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
