import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/shared/classes/category';
import { CategoriesListService } from 'src/app/core/services/categories-list.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { getCategoriesAction } from 'src/app/core/store/actions/getCategories.action';
import {
  categoriesSelector,
  errorSelector,
  isLoadingSelector,
} from 'src/app/core/store/selectors/categoties.selectors';
import { CategoriesStateInteface } from 'src/app/shared/interfaces/categoriesState.interface';

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
  // public url = 'http://localhost:3000/goods';
  constructor(
    private productServ: CategoriesListService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initialiseValues();
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.categories = val;
    });
    // this.getCategoryes();
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
  // public setType(id: number): void {
  //   this.categories.find((val) => val.id === id);
  // }

  // public getCategoryes(): void {
  //   this.productServ
  //     .getCategories()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((data) => {
  //       // this.categories = data;
  //       console.log(data);
  //     });
  // }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
