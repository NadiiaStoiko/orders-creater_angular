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
  submitted = false;
  startId = 0;
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
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      roles: new FormControl(null, Validators.required),
    });
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // onSubmit() {
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   this.submitted = true;
  //   console.log(this.form.value);
  //   this.auth
  //     .register(this.form.value)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(
  //       (res) => {
  //         console.log('res', res);
  //         this.router.navigate(['/login'], {
  //           queryParams: {
  //             registred: true,
  //           },
  //         });
  //       },
  //       (error) => {
  //         console.warn(error);
  //         this.form.enable();
  //       }
  //     );
  // }
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(registerAction(this.form.value));
    // this.store.pipe(select(isRegistredSelector));

    // this.submitted = true;

    console.log(this.form.value, 1111);

    // this.auth
    //   .register(this.form.value)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     (res) => {
    //       console.log('res', res);
    //       this.router.navigate(['/login'], {
    //         queryParams: {
    //           registred: true,
    //         },
    //       });
    //     },
    //     (error) => {
    //       console.warn(error);
    //       this.form.enable();
    //     }
    //   );
  }
}
