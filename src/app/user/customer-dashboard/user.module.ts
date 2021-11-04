import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CustomerDashboardComponent } from './customer-dashboard';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [CustomerDashboardComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class UserModule {}
