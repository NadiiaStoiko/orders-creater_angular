import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoodsDataService } from 'src/app/core/services/goods-data.service';
import { Dish } from 'src/app/shared/classes/dish';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DishesDataService } from 'src/app/core/services/dishes-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dishes-by-categories',
  templateUrl: './dishes-by-categories.component.html',
  styleUrls: ['./dishes-by-categories.component.css'],
})
export class DishesByCategoriesComponent implements OnInit, OnDestroy {
  public dishes!: Dish[];
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dishesServ: DishesDataService,
    public productServ: GoodsDataService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getDishes();
  }

  public getDishes(): void {
    this.dishesServ
      .getDishes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.dishes = data;
      });
  }

  public openDialog(id: number): void {
    this.dialog.open(ModalComponent, { data: id });
  }

  public addDishToCart(dish: Dish): void {
    this.dishesServ.addDishToCard(dish);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
