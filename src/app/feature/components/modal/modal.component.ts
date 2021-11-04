import { Component, Inject, OnInit } from '@angular/core';
import { Dish } from 'src/app/shared/classes/dish';
import { DishesDataService } from 'src/app/core/services/dishes-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  public dish!: Dish;

  constructor(
    private dishesServ: DishesDataService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {
    console.log('data', this.data);
    this.getDish();
  }

  public getDish(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.dishesServ.getByID(this.data).subscribe((dish) => {
      this.dish = dish;
    });
    // console.log(this.dish);
  }
  public addDishToCart(): void {
    this.dishesServ.addDishToCard(this.dish);
    // this.dishesServ.addDishToCard(this.dish).subscribe((data) => {
    //   console.log(data);
    // });
  }
}
