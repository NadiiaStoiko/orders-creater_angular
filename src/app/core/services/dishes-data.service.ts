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
  public url = environment.urlDishes; //env
  public endpoint = 'categoryId'; //useless

  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log();
  }

  public getDishes(categoryID: number): Observable<Dish[]> {
    return this.http.get<Dish[]>(
      `${this.url}?${this.endpoint}=${categoryID}` //query params
    );
  }

  public getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.url);
  }

  public deleteDish(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.url}/${id}`);
  }
}
