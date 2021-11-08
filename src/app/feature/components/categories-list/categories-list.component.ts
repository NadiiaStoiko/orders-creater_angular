import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Category } from 'src/app/shared/classes/category';
import { CategoriesListService } from 'src/app/core/services/categories-list.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { getCategoriesAction } from 'src/app/core/store/actions/categories.action';
import {
  categoriesSelector,
  errorSelector,
  isLoadingSelector,
} from 'src/app/core/store/selectors/categoties.selectors';
// import { CategoriesStateInteface } from 'src/app/shared/interfaces/categoriesState.interface';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  public categories: Category[] = [];

  @Output() public categoryId = 0;
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
  public setType(categoryId: number): void {
    // this.categories.find((val) => val.id === id);
    this.categoryId = categoryId;
    console.log(this.categoryId);
  }

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
