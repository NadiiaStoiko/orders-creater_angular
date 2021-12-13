import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
  addCategoryAction,
  editCategoryAction,
  getCategoryByIdAction,
} from 'src/app/core/store/actions/categories.action';
import {
  categoryAddFailureSelector,
  categoryByIdSelector,
  categoryEditFailureSelector,
  isAddCategorySelector,
  isUpdateCategorySelector,
} from 'src/app/core/store/selectors/categoties.selectors';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Category } from 'src/app/shared/classes/category';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css'],
})
export class AddCategoriesComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public errors$!: Observable<string>;
  public errorMessage!: string;
  public id!: number;
  public editCategory: any;
  public isEdit = false;
  public isUpdated = false;
  public isAdded = false;
  public editCategotry$!: Observable<Category>;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private store: Store,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(filter((params) => params.id))
      .subscribe(({ id }) => (this.id = id));
    console.log(this.id);
    this.store.dispatch(getCategoryByIdAction({ categoryId: this.id }));
    this.store
      .pipe(select(categoryByIdSelector, { id: this.id }))
      .subscribe((val) => {
        this.editCategory = val;
        if (this.editCategory) {
          this.isEdit = true;
        }
      });

    this.form = new FormGroup({
      types: new FormControl(!this.isEdit ? null : this.editCategory.types, [
        //!type
        Validators.required,
        Validators.minLength(1),
      ]),
      description: new FormControl(
        !this.isEdit ? null : this.editCategory.description,
        [Validators.required, Validators.minLength(2)]
      ),
      url: new FormControl(!this.isEdit ? null : this.editCategory.url, [
        Validators.required,
      ]),
    });
  }

  public onSubmit(formDirective: any): void {
    let message = 'New category added';

    if (this.form.invalid) {
      return;
    }

    !this.isEdit
      ? this.store.dispatch(addCategoryAction(this.form.value))
      : this.store.dispatch(
          editCategoryAction({ id: this.id, category: this.form.value })
        );

    if (this.isEdit) {
      this.router.navigate(['admin-dashboard/categories-dashboard']);
    }

    this.store
      .pipe(
        select(isUpdateCategorySelector),
        filter((val) => val === true),
        takeUntil(this.destroy$)
      )
      .subscribe((val) => {
        this.isUpdated = val;
        console.log('Up', val);
      });

    this.store
      .pipe(
        select(isAddCategorySelector),
        filter((val) => val === true),
        takeUntil(this.destroy$)
      )
      .subscribe((val) => {
        this.isAdded = val;
        console.log('Add', val);
      });

    this.isEdit ? (message = 'Category updated') : message; //! if no edit

    if (this.isAdded === true) {
      this.openSnackBar(message); //! after effect dispatch success
    }
    if (this.isUpdated === true) {
      this.openSnackBar(message); //! after effect dispatch success
    }

    this.store
      .pipe(
        select(categoryAddFailureSelector),
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
        select(categoryEditFailureSelector),
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
