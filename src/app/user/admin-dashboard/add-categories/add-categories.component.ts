import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import {
  addCategoryAction,
  getCategoryByIdAction,
} from 'src/app/core/store/actions/categories.action';
import {
  categoryAddFailureSelector,
  categoryByIdSelector,
  // categoryByIdSelector,
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
  errors$!: Observable<string | null>;
  editCategotry$!: Observable<any>;
  public errorMessage!: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public id: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public editCategory: any;
  // public editCategory = Category as {} | null;
  public isEdit = false;

  constructor(
    private router: Router,
    private store: Store,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit() {
    this.route.queryParams
      .pipe(filter((params) => params.id))
      .subscribe(({ id }) => (this.id = id));
    console.log(this.id);
    this.store.dispatch(getCategoryByIdAction(this.id));
    this.store
      .pipe(select(categoryByIdSelector, { id: this.id }))
      .subscribe((val) => {
        //! filter tap
        // this.editCategory = val;
        console.log(val);
        // if (this.editCategory) {
        //   this.isEdit = true;
        // }
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
      url: new FormControl(
        this.isEdit == false ? null : this.editCategory.url, //!
        [Validators.required]
      ),
    });

    this.errors$ = this.store.pipe(select(categoryAddFailureSelector));

    this.errors$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      //! filter map
      this.errorMessage = val;
      // console.log(val);
      if (this.errorMessage) this.openSnackBar('Some error happend...');
    });
  }

  public onSubmit(formDirective: any): void {
    const message = 'New dish added';
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(addCategoryAction(this.form.value));
    this.openSnackBar(message); //! in subscribe
    console.log(this.form.value, 'add category');
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
