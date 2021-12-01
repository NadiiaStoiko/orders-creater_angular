import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
  addDishAction,
  editDishAction,
  getDishByIdAction,
} from 'src/app/core/store/actions/dishes.action';
import {
  dishAddFailureSelector,
  dishEditFailureSelector,
  dishesByIdSelector,
  isAddedDishSelector,
  isUpdateDishSelector,
} from 'src/app/core/store/selectors/dishes.selectors';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { getCategoriesAction } from 'src/app/core/store/actions/categories.action';
import { Category } from 'src/app/shared/classes/category';
import { categoriesSelector } from 'src/app/core/store/selectors/categoties.selectors';

@Component({
  selector: 'app-add-dishes',
  templateUrl: './add-dishes.component.html',
  styleUrls: ['./add-dishes.component.css'],
})
export class AddDishesComponent implements OnInit, OnDestroy {
  //!combine add and edit
  public form!: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public errors$!: Observable<any>;
  public errorMessage!: string | null;
  public categories$!: Observable<Category[]>;
  public categories: Category[] = [];
  public id!: number;
  public editDish: any;
  public isEdit = false;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';
  public isUpdated = false;
  public isAdded = false;

  constructor(
    private router: Router,
    private store: Store,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(filter((params) => params.id))
      .subscribe((params) => (this.id = params.id));
    console.log(this.id);

    this.store.dispatch(getDishByIdAction({ dishId: this.id }));
    this.store
      .pipe(select(dishesByIdSelector, { id: this.id }))
      .subscribe((val) => {
        this.editDish = val;
        console.log(val);
        if (this.editDish) {
          this.isEdit = true;
        }
      });

    this.form = new FormGroup({
      categoryId: new FormControl(
        !this.isEdit ? null : this.editDish.categoryId,
        [Validators.required]
      ),
      name: new FormControl(!this.isEdit ? null : this.editDish.name, [
        Validators.required,
        Validators.minLength(1),
      ]),
      weight: new FormControl(!this.isEdit ? null : this.editDish.weight, [
        Validators.required,
        Validators.minLength(1),
      ]),
      description: new FormControl(
        !this.isEdit ? null : this.editDish.description,
        [Validators.required, Validators.minLength(2)]
      ),
      price: new FormControl(!this.isEdit ? null : this.editDish.price, [
        Validators.required,
        Validators.minLength(2),
      ]),
      url: new FormControl(!this.isEdit ? null : this.editDish.url, [
        Validators.required,
      ]),
    });

    this.getCategoriesData();
  }

  public onSubmit(formDirective: any): void {
    let message = 'New dish added';
    if (this.form.invalid) {
      return;
    }

    !this.isEdit
      ? this.store.dispatch(addDishAction(this.form.value))
      : this.store.dispatch(
          editDishAction({ id: this.id, dish: this.form.value })
        );

    if (this.isEdit) {
      this.router.navigate(['admin-dashboard/dishes-dashboard']);
    }

    this.store
      .pipe(
        select(isUpdateDishSelector),
        filter((val) => val === true),
        takeUntil(this.destroy$)
      )
      .subscribe((val) => {
        this.isUpdated = val;
        console.log('Up', val);
      });

    this.store
      .pipe(
        select(isAddedDishSelector),
        filter((val) => val === true),
        takeUntil(this.destroy$)
      )
      .subscribe((val) => {
        this.isAdded = val;
        console.log('Add', val);
      });

    this.isEdit ? (message = 'Dish updated') : message;

    if (this.isAdded === true) {
      this.openSnackBar(message); //! after effect dispatch success
    }
    if (this.isUpdated === true) {
      this.openSnackBar(message); //! after effect dispatch success
    }

    this.store
      .pipe(
        select(dishAddFailureSelector),
        filter((val) => typeof val === 'string'),
        takeUntil(this.destroy$)
      )
      .subscribe((val) => {
        this.errorMessage = val;
        console.log(val);
        this.openSnackBar('Some error happend...');
      });

    this.store
      .pipe(
        select(dishEditFailureSelector),
        filter((val) => typeof val === 'string'),
        takeUntil(this.destroy$)
      )
      .subscribe((val) => {
        this.errorMessage = val;
        console.log(val);
        this.openSnackBar('Some error happend...');
      });

    this.form.reset();
    formDirective.resetForm();
  }

  public openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  public getCategoriesData(): void {
    this.store.dispatch(getCategoriesAction());
    this.categories$ = this.store.pipe(select(categoriesSelector));
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe((categories) => {
      this.categories = categories;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
