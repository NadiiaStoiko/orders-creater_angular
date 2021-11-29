import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoriesListService } from 'src/app/core/services/categories-list.service';
import {
  deleteCategoryAction,
  getCategoriesAction,
} from 'src/app/core/store/actions/categories.action';
import { categoriesSelector } from 'src/app/core/store/selectors/categoties.selectors';
import { Category } from 'src/app/shared/classes/category';

@Component({
  selector: 'app-categories-dashboard',
  templateUrl: './categories-dashboard.component.html',
  styleUrls: ['./categories-dashboard.component.css'],
})
export class CategoriesDashboardComponent implements OnInit {
  categories$!: Observable<Category[]>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public categories: Category[] = [];

  constructor(
    private store: Store,
    private categoryServ: CategoriesListService,
    private router: Router
  ) {
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
    // this.store.dispatch(editCategoryAction({ category, id }));
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
