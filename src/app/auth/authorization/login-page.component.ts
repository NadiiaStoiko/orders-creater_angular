import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { loginAction } from 'src/app/core/store/actions/auth.action';
import {
  isLogginSelector,
  isSubmittingLoginSelector,
  LogginErrorsSelector,
  userRoleSelector,
} from 'src/app/core/store/selectors/auth.selectors ';
import { User } from 'src/app/shared/classes/user';

@Component({
  selector: 'app-authorization',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  users: User[] = [];
  public destroy$: Subject<boolean> = new Subject<boolean>();
  isSubmitting$!: Observable<boolean>;
  errors$!: Observable<string | null>;
  public errorMessage!: string | null;
  // public isLogin!: Observable<boolean>;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
    this.isSubmitting$ = this.store.pipe(select(isSubmittingLoginSelector));
    this.errors$ = this.store.pipe(select(LogginErrorsSelector));
    this.errors$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.errorMessage = val;
    });
  }

  public login(): void {
    if (this.form.invalid) {
      return;
    }

    this.form.disable();

    this.store.dispatch(loginAction(this.form.value));

    this.store.pipe(select(isLogginSelector)).subscribe((data) => {
      if (!data) return;

      this.store.pipe(select(userRoleSelector)).subscribe(
        (userRole) => {
          this.router.navigate([`/${userRole}-dashboard`]);
        },
        (error) => {
          console.warn(error);
          this.form.enable();
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
