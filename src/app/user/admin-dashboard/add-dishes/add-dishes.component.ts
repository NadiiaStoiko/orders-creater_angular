import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Dish } from 'src/app/shared/classes/dish';

@Component({
  selector: 'app-add-dishes',
  templateUrl: './add-dishes.component.html',
  styleUrls: ['./add-dishes.component.css'],
})
export class AddDishesComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private router: Router, private store: Store) {}

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
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    // this.store.dispatch(registerAction(this.form.value));
    // this.submitted = true;
    console.log(this.form.value, 'register');
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
