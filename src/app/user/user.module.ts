import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CategoriesDashboardComponent } from 'src/app/user/admin-dashboard/categories-dashboard/categories-dashboard.component';
import { DishesDashboardComponent } from 'src/app/user/admin-dashboard/dishes-dashboard/dishes-dashboard.component';
import { AddCategoriesComponent } from './admin-dashboard/add-categories/add-categories.component';
import { AddDishesComponent } from './admin-dashboard/add-dishes/add-dishes.component';

import {
  AddCategoryEffects,
  DeleteCategoryEffects,
  EditCategoryEffects,
  SelecedCategoryEffects,
} from '../core/store/effects/categories.effect';
import { EffectsModule } from '@ngrx/effects';
import {
  AddDishEffects,
  DeleteDishEffects,
  EditDishEffects,
  GetAllDishesEffects,
  GetDishByIdEffects,
} from '../core/store/effects/dishes.effect';
import {
  AddOrderEffects,
  GetOrdersEffects,
} from '../core/store/effects/cart.effect';
import { OrderDashboardComponent } from './admin-dashboard/order-dashboard/order-dashboard.component';
import { StoreModule } from '@ngrx/store';
import { reducersForOrders } from '../core/store/redusers/orders.redusers ';

@NgModule({
  declarations: [
    CustomerDashboardComponent,
    DishesDashboardComponent,
    AdminDashboardComponent,
    CategoriesDashboardComponent,
    AddCategoriesComponent,
    AddDishesComponent,
    OrderDashboardComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EffectsModule.forFeature([
      DeleteCategoryEffects,
      GetAllDishesEffects,
      DeleteDishEffects,
      AddDishEffects,
      AddCategoryEffects,
      EditCategoryEffects,
      EditDishEffects,
      SelecedCategoryEffects,
      GetDishByIdEffects,
      AddOrderEffects,
      GetOrdersEffects,
    ]),
    StoreModule.forFeature('orders', reducersForOrders),
  ],
})
export class UserModule {}
