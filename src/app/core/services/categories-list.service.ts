import { Injectable } from '@angular/core';
import { Category } from 'src/app/shared/classes/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesListService {
  public id = 0;
  public url = 'http://localhost:3000/goods';

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  public getCategoryByID(id: number): void {
    this.id = id;
  }
}
