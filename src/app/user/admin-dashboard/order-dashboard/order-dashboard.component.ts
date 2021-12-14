import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getOrderAction } from 'src/app/core/store/actions/cart.action';
import { ordersSelector } from 'src/app/core/store/selectors/orders.selectors';

@Component({
  selector: 'app-order-dashboard',
  templateUrl: './order-dashboard.component.html',
  styleUrls: ['./order-dashboard.component.css'],
})
export class OrderDashboardComponent implements OnInit {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public orders$!: Observable<any>;
  public orders: any = [];
  public dishesList: any = [];
  public displayedColumns: string[] = [
    'Order Id',
    'Client name',
    'Client Id',
    'Ordered dishes',
    'Amount of order',
    'Delete',
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.fetchData();
    this.orders$ = this.store.pipe(select(ordersSelector));
    this.orders$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.orders = val;
      console.log('val', this.orders);

      const dishes = this.orders.map((element: any) => element.order.dishes);
      console.log('dishes', dishes);

      const nameDishes: string[] = dishes?.map((dish: any) =>
        dish.map((d: any) => d?.dish.name)
      );
      console.log('nameDishes', nameDishes);
      this.dishesList = nameDishes[0];
      console.log('this.dishesList', this.dishesList);
    });
  }

  public fetchData(): void {
    this.store.dispatch(getOrderAction());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
