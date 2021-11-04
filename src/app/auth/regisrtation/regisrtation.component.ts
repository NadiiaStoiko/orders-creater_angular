import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
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

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      roles: new FormControl(null, Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    console.log(this.form.value);
    this.auth
      .register(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          console.log('res', res);
          this.router.navigate(['/login'], {
            queryParams: {
              registred: true,
            },
          });
        },
        (error) => {
          console.warn(error);
          this.form.enable();
        }
      );
  }
}
