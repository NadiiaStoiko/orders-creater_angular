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
  // public id = 0;
  public url = environment.urlCategories; //environment

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  // public getCategoryByID(id: number): void {
  //   this.id = id;
  // }

  public deleteCategory(id: number): Observable<{}> {
    return this.http.delete<{}>(this.url + '/' + id); //``
  }
}
