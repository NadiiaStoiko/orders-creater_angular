import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'src/app/shared/classes/category';
import { GoodsDataService } from 'src/app/core/services/goods-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  public categories!: Category[];
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private productServ: GoodsDataService) {}

  ngOnInit(): void {
    this.getCategoryes();
  }

  public setType(id: number): void {
    const typeId = id;
    this.productServ.setType(typeId);
  }

  public getCategoryes(): void {
    this.productServ
      .getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.categories = data;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
