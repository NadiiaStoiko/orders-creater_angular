import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../feature/components/cart/cart.component';
import { ModalComponent } from '../feature/components/modal/modal.component';
import { MaterialModule } from '../shared/material/material.module';
import { CategoriesListComponent } from '../feature/components/categories-list/categories-list.component';
import { DishesByCategoriesComponent } from '../feature/components/dishes-by-categories/dishes-by-categories.component';
import { FiltrationPipe } from '../shared/pipes/filtration.pipe';
import { AppRoutingModule } from '../app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { GetCategoriesEffects } from '../core/store/effects/categories.effect';
import {
  GetDishesEffects,
  // GetDishByIdEffectes,
} from '../core/store/effects/dishes.effect';
import { StoreModule } from '@ngrx/store';
import { reducersForCategories } from '../core/store/redusers/categories.redusers';
import { reducersForDishes } from '../core/store/redusers/dishes.redusers';

@NgModule({
  declarations: [
    CartComponent,
    ModalComponent,
    CategoriesListComponent,
    DishesByCategoriesComponent,
    FiltrationPipe,
  ],
  entryComponents: [ModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    EffectsModule.forFeature([
      GetCategoriesEffects,
      GetDishesEffects,
      // GetDishByIdEffectes,
    ]),
    StoreModule.forFeature('categories', reducersForCategories),
    StoreModule.forFeature('dishes', reducersForDishes),
  ],
  exports: [
    CartComponent,
    ModalComponent,
    CategoriesListComponent,
    DishesByCategoriesComponent,
    FiltrationPipe,
  ],
})
export class MenuModule {}
