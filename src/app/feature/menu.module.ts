import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../feature/components/cart/cart.component';
import { ModalComponent } from '../feature/components/modal/modal.component';
import { MaterialModule } from '../shared/material/material.module';
import { CategoriesListComponent } from '../feature/components/categories-list/categories-list.component';
import { DishesByCategoriesComponent } from '../feature/components/dishes-by-categories/dishes-by-categories.component';
import { FiltrationPipe } from '../shared/pipes/filtration.pipe';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    CartComponent,
    ModalComponent,
    CategoriesListComponent,
    DishesByCategoriesComponent,
    FiltrationPipe,
  ],
  entryComponents: [ModalComponent],
  imports: [CommonModule, MaterialModule, AppRoutingModule],
  exports: [
    CartComponent,
    ModalComponent,
    CategoriesListComponent,
    DishesByCategoriesComponent,
    FiltrationPipe,
  ],
})
export class MenuModule {}
