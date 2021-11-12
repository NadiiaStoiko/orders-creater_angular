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
    this.dishesServ.getByID(this.data).subscribe((dish) => {
      this.dish = dish;
    });
  }
  public addDishToCart(): void {
    this.dishesServ.addDishToCard(this.dish);
  }
}
