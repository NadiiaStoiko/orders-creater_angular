import { Injectable } from '@angular/core';
import { Category } from 'src/app/shared/classes/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { CategoriesStateInteface } from 'src/app/shared/interfaces/categoriesState.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesListService {
  public id = 0;
  // public categories: Category[] = [];
  public url = 'http://localhost:3000/goods';

  constructor(private http: HttpClient) {}

  // public getCategories() {
  //   return this.callCategories();
  // }

  // public callCategories(): Observable<Category[]> {
  //   return this.http.get<Category[]>(this.url);
  // }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  // public setType(id: number): void {
  //   this.id = id;
  // }
}
