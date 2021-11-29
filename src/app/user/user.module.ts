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
import { EditDishesComponent } from './admin-dashboard/edit-dishes/edit-dishes.component';
import { EditCategoriesComponent } from './admin-dashboard/edit-categories/edit-categories.component';
import {
  AddCategoryEffects,
  DeleteCategoryEffects,
  EditCategoryEffects,
} from '../core/store/effects/categories.effect';
import { EffectsModule } from '@ngrx/effects';
import {
  AddDishEffects,
  DeleteDishEffects,
  EditDishEffects,
  GetAllDishesEffects,
} from '../core/store/effects/dishes.effect';

@NgModule({
  declarations: [
    CustomerDashboardComponent,
    DishesDashboardComponent,
    AdminDashboardComponent,
    CategoriesDashboardComponent,
    AddCategoriesComponent,
    AddDishesComponent,
    EditDishesComponent,
    EditCategoriesComponent,
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
    ]),
  ],
})
export class UserModule {}
