import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/shared/classes/category';
import { CategoriesListService } from 'src/app/core/services/categories-list.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { getCategoriesAction } from 'src/app/core/store/actions/categories.action';
import { LoadDishesByCategoryAction } from 'src/app/core/store/actions/dishes.action';
import {
  categoriesSelector,
  errorSelector,
  isLoadingSelector,
} from 'src/app/core/store/selectors/categoties.selectors';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  public categories: Category[] = [];

  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  categories$!: Observable<Category[]>;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private productServ: CategoriesListService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initialiseValues();
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.categories = val;
    });
    this.fetchData();
  }

  public initialiseValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.categories$ = this.store.pipe(select(categoriesSelector));
  }

  public fetchData(): void {
    this.store.dispatch(getCategoriesAction());
  }

  public selectCategory(categoryId: number): void {
    this.store.dispatch(LoadDishesByCategoryAction({ categoryId }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
