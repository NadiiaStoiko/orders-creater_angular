import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderInterface } from 'src/app/shared/interfaces/order.interface ';

@Injectable({
  providedIn: 'root',
})
export class OrdersDataService implements OnInit {
  public url = environment.dbUrl;
  public endpoint = 'orders';
  // public par = 'categoryId';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log();
  }

  // public getDishByDishId(id: number): Observable<Dish> {
  //   return this.http.get<Dish>(`${this.url}/${this.endpoint}`, {
  //     params: { id },
  //   });
  // }

  public getAllOrders(): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>(`${this.url}/${this.endpoint}`);
  }

  public addOrder(order: OrderInterface): Observable<OrderInterface> {
    return this.http.post<OrderInterface>(
      `${this.url}/${this.endpoint}`,
      order
    );
  }
}
