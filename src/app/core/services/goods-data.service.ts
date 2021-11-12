import { Injectable, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/classes/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GoodsDataService implements OnInit {
  public id = 0;
  public categories: Category[] = [];
  public url = 'http://localhost:3000/goods';

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.getCategories();
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  public setType(id: number): void {
    this.id = id;
  }
}
