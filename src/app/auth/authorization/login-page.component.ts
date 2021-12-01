import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { loginAction } from 'src/app/core/store/actions/auth.action';
import {
  isLogginSelector,
  LogginErrorsSelector,
  userRoleSelector,
} from 'src/app/core/store/selectors/auth.selectors ';
import { User } from 'src/app/shared/classes/user';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-authorization',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public users: User[] = [];
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public errorMessage!: string | null;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';
  public isLogin = false;

  constructor(
    private router: Router,
    private store: Store,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  public login(formDirective: any): void {
    const message = 'You loggedIn successful';

    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(loginAction(this.form.value));

    this.store.pipe(select(isLogginSelector)).subscribe((data) => {
      if (!data) return;

      this.isLogin = data;
      console.log(this.isLogin);
      if (this.isLogin === true) this.openSnackBar(message);

      this.store.pipe(select(userRoleSelector)).subscribe((userRole) => {
        this.router.navigate([`/${userRole}-dashboard`]);
      });
    });

    this.store
      .pipe(select(LogginErrorsSelector), takeUntil(this.destroy$))
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
