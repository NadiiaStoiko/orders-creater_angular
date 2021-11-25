/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { Category } from 'src/app/shared/classes/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesListService {
  public url = environment.dbUrl; //environment
  public endpoint = 'goods';

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/${this.endpoint}`);
  }

  public deleteCategory(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.url}/${this.endpoint}/${id}`); //``
  }

  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.url}/${this.endpoint}`, category);
  }
}
