import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  isRegistredErrorSelector,
  isRegistredSelector,
  isSubmittingSelector,
} from 'src/app/core/store/selectors/auth.selectors ';
import { registerAction } from 'src/app/core/store/actions/auth.action';
import { User } from 'src/app/shared/classes/user';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';

interface isAdmin {
  role: string;
}

@Component({
  selector: 'app-regisrtation',
  templateUrl: './regisrtation.component.html',
  styleUrls: ['./regisrtation.component.css'],
})
export class RegisrtationComponent implements OnInit, OnDestroy {
  public user: User | undefined;
  public form!: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public roles: isAdmin[] = [{ role: 'admin' }, { role: 'customer' }];
  public isSubmitting$!: Observable<boolean>;
  public isRegisttred$!: Observable<boolean>;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';
  public isRegistred = false;
  public errorMessage!: string | null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      roles: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
      ]),
    });
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }

  public onSubmit(formDirective: any): void {
    const message = 'You registred successful';

    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(registerAction(this.form.value));

    this.store.pipe(select(isRegistredSelector)).subscribe((data) => {
      if (!data) return;

      this.isRegistred = data;
      console.log(this.isRegistred);
      if (this.isRegistred === true) this.openSnackBar(message);
    });

    this.store
      .pipe(select(isRegistredErrorSelector), takeUntil(this.destroy$))
      .subscribe((data) => {
        if (!data) return;
        this.errorMessage = data;
        this.openSnackBar(this.errorMessage);
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
