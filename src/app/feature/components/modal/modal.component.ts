import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Dish } from 'src/app/shared/classes/dish';
import { DishesDataService } from 'src/app/core/services/dishes-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  public dish!: Dish;
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dishesServ: DishesDataService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {
    console.log('data', this.data);
    // this.getDish();
  }

  // public getDish(): void {
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   this.dishesServ.getByID(this.data).subscribe((dish) => {
  //     this.dish = dish;
  //   });
  // }
  // public addDishToCart(): void {
  //   this.dishesServ.addDishToCard(this.dish);
  // }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
