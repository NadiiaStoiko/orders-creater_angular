/* eslint-disable @typescript-eslint/ban-types */
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { Dish } from 'src/app/shared/classes/dish';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DishesDataService implements OnInit {
  public dishes: Dish[] = [];
  public url = environment.dbUrl;
  public endpoint = 'dishes';
  public par = 'categoryId';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log();
  }

  public getDishes(categoryId: number): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.url}/${this.endpoint}`, {
      params: { categoryId },
    });
  }

  public getDishByDishId(id: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.url}/${this.endpoint}`, {
      params: { id },
    });
  }

  public getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.url}/${this.endpoint}`);
  }

  public deleteDish(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.url}/${this.endpoint}/${id}`);
  }

  public addDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(`${this.url}/${this.endpoint}`, dish);
  }

  public updateDish(id: number, dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${this.url}/${this.endpoint}/${id}`, dish);
  }
}
