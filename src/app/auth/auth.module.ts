import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './authorization/login-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { RegisrtationComponent } from './regisrtation/regisrtation.component';
import { StoreModule } from '@ngrx/store';
import { reducersForRegister } from '../core/store/redusers/register.redusers';
import { EffectsModule } from '@ngrx/effects';
import {
  LoginEffects,
  RegisterEffects,
} from '../core/store/effects/auth.effect';
import { reducersForLogin } from '../core/store/redusers/login.redusers';

@NgModule({
  declarations: [LoginPageComponent, RegisrtationComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('register', reducersForRegister),
    StoreModule.forFeature('login', reducersForLogin),
    EffectsModule.forFeature([RegisterEffects, LoginEffects]),
  ],
})
export class AuthModule {}
