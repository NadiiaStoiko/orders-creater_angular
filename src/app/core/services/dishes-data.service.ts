import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { Dish } from 'src/app/shared/classes/dish';

@Injectable({
  providedIn: 'root',
})
export class DishesDataService implements OnInit {
  public dishes: Dish[] = [];
  public url = 'http://localhost:3000/dishes';

  private cardKeyProduct = 'dishesInCard';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public cartProducts: any[] = [];

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.getDishes();
  }

  public getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.url);
  }

  public getByID(id: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.url}/${id}`);
  }

  public addDishToCard(dish: Dish, quantity = 1): void {
    const dishData = { dishId: dish.id, quantity: quantity };
    this.cartProducts.push(dishData);

    const map = new Map();
    this.cartProducts.forEach(({ dishId, quantity }) => {
      if ((map.get(dishId) || 0) + quantity === 0) {
        map.delete(dishId);
      } else {
        map.set(dishId, (map.get(dishId) || 0) + quantity);
      }
    });
    this.cartProducts = Array.from(map, ([dishId, quantity]) => ({
      dishId,
      quantity,
    }));

    localStorage.setItem(
      this.cardKeyProduct,
      JSON.stringify(this.cartProducts)
    );
  }

  public getDishesFromCart() {
    this.cartProducts = JSON.parse(
      localStorage.getItem(this.cardKeyProduct) || '[]'
    );
    return this.cartProducts;
  }

  public getCartDishesCount(): number {
    this.cartProducts = JSON.parse(
      localStorage.getItem(this.cardKeyProduct) || '[]'
    );
    return this.cartProducts
      .map((product) => product.quantity)
      .reduce((acc, value): number => {
        return acc + value;
      }, 0);
  }

  public getCartDishesId(): number[] {
    const cartProductsId: number[] = [];
    this.cartProducts = JSON.parse(
      localStorage.getItem(this.cardKeyProduct) || '[]'
    );
    this.cartProducts.forEach((item: { dishId: number }) => {
      cartProductsId.push(item.dishId);
    });
    console.log(cartProductsId);
    return cartProductsId;
  }

  public removeDishesFromCart() {
    localStorage.removeItem(this.cardKeyProduct);
  }
}
