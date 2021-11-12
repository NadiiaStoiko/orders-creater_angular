import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { Dish } from 'src/app/shared/classes/dish';

@Injectable({
  providedIn: 'root',
})
export class DishesDataService implements OnInit {
  public dishes: Dish[] = [];
  public baseUrl = 'http://localhost:3000/dishes';
  public endpoint1 = 'categoryId';
  public endpoint2 = 'id';

  // private cardKeyProduct = 'dishesInCard';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // public cartProducts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.getDishes();
  }

  public getDishes(categoryID: number): Observable<Dish[]> {
    return this.http.get<Dish[]>(
      `${this.baseUrl}?${this.endpoint1}=${categoryID}`
    );
  }

  //   localStorage.setItem(
  //     this.cardKeyProduct,
  //     JSON.stringify(this.cartProducts)
  //   );
  // }

  // public getDishesFromCart() {
  //   this.cartProducts = JSON.parse(
  //     localStorage.getItem(this.cardKeyProduct) || '[]'
  //   );
  //   return this.cartProducts;
  // }

  // public getCartDishesCount(): number {
  //   this.cartProducts = JSON.parse(
  //     localStorage.getItem(this.cardKeyProduct) || '[]'
  //   );
  //   return this.cartProducts
  //     .map((product) => product.quantity)
  //     .reduce((acc, value): number => {
  //       return acc + value;
  //     }, 0);
  // }

  // public getCartDishesId(): number[] {
  //   const cartProductsId: number[] = [];
  //   this.cartProducts = JSON.parse(
  //     localStorage.getItem(this.cardKeyProduct) || '[]'
  //   );
  //   this.cartProducts.forEach((item: { dishId: number }) => {
  //     cartProductsId.push(item.dishId);
  //   });
  //   console.log(cartProductsId);
  //   return cartProductsId;
  // }

  // public removeDishesFromCart() {
  //   localStorage.removeItem(this.cardKeyProduct);
  // }
}
