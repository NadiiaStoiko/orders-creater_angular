import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { addCategoryAction } from 'src/app/core/store/actions/categories.action';
import { categoryAddFailureSelector } from 'src/app/core/store/selectors/categoties.selectors';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css'],
})
export class AddCategoriesComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  errors$!: Observable<string | null>;
  public errorMessage!: string | null;

  constructor(
    private router: Router,
    private store: Store,
    private _snackBar: MatSnackBar
  ) {}
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
    this.form = new FormGroup({
      types: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      url: new FormControl(null, [Validators.required]),
    });
    this.errors$ = this.store.pipe(select(categoryAddFailureSelector));

    this.errors$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.errorMessage = val;
      console.log(val);
      if (this.errorMessage != null) this.openSnackBar('Some error happend...');
    });
  }

  public onSubmit(): void {
    const message = 'New dish added';
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(addCategoryAction(this.form.value));
    this.openSnackBar(message);
    console.log(this.form.value, 'add category');
    this.form.reset;
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
