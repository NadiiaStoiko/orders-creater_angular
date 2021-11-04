import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMenuComponent } from '../core/components/header-menu/header-menu.component';
import { FooterComponent } from '../core/components/footer/footer.component';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [HeaderMenuComponent, FooterComponent],
  imports: [MaterialModule, CommonModule, AppRoutingModule],
  exports: [HeaderMenuComponent, FooterComponent],
})
export class ShearedModule {}
