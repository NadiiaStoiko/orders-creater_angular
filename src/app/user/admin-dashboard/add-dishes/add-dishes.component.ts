import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { addDishAction } from 'src/app/core/store/actions/dishes.action';
import { dishAddFailureSelector } from 'src/app/core/store/selectors/dishes.selectors';
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
  public errors$!: Observable<string | null>;
  categories$!: Observable<Category[]>;
  public errorMessage!: string | null;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';
  // public categories = [1, 2, 3, 4, 5, 6, 7];
  public categories: number[] = [];

  constructor(
    private router: Router,
    private store: Store,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      categoryId: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      weight: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      url: new FormControl(null, [Validators.required]),
    });

    this.errors$ = this.store.pipe(select(dishAddFailureSelector));

    this.errors$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.errorMessage = val;
      console.log(val);
      if (this.errorMessage != null) this.openSnackBar('Some error happend...');
    });
    this.getCategoriesData();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onSubmit(formDirective: any): void {
    const message = 'New dish added';
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(addDishAction(this.form.value));
    // this.submitted = true;
    console.log(this.form.value, 'add dish');
    this.openSnackBar(message); //! after effect dispatch success
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
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      const categoriesId = data.map((value) => value.id);
      this.categories = categoriesId;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
