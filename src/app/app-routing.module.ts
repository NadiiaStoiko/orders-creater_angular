import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './auth/authorization/login-page.component';
import { CartComponent } from './feature/components/cart/cart.component';
import { CategoriesListComponent } from './feature/components/categories-list/categories-list.component';
import { RegisrtationComponent } from './auth/regisrtation/regisrtation.component';
import { CustomerDashboardComponent } from './user/customer-dashboard/customer-dashboard';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminDashboardComponent } from './user/admin-dashboard/admin-dashboard.component';
import { RoleGuard } from './shared/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'categories', component: CategoriesListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisrtationComponent },
  {
    path: 'customer-dashboard',
    component: CustomerDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [RoleGuard],
  },

  { path: '**', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
