import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  isSubmittingSelector,
  // isRegistredSelector,
} from 'src/app/core/store/selectors/auth.selectors ';
import { registerAction } from 'src/app/core/store/actions/auth.action';
import { User } from 'src/app/shared/classes/user';

interface isAdmin {
  role: string;
}

@Component({
  selector: 'app-regisrtation',
  templateUrl: './regisrtation.component.html',
  styleUrls: ['./regisrtation.component.css'],
})
export class RegisrtationComponent implements OnInit, OnDestroy {
  user: User | undefined;
  form!: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public roles: isAdmin[] = [{ role: 'admin' }, { role: 'customer' }];
  isSubmitting$!: Observable<boolean>;
  isRegisttred$!: Observable<boolean>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.form.disable();
    this.store.dispatch(registerAction(this.form.value));
    console.log(this.form.value, 'register');
  }
}
