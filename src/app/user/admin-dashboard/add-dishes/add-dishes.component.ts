import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { addDishAction } from 'src/app/core/store/actions/dishes.action';
// import { Dish } from 'src/app/shared/classes/dish';

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
      categoryId: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      id: new FormControl(null, [Validators.required, Validators.minLength(1)]),
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
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(addDishAction(this.form.value));
    // this.submitted = true;
    console.log(this.form.value, 'add dish');
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
