import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { ProductCreateComponent } from './product-settings/product-create/product-create.component';
import { ProductEditComponent } from './product-settings/product-edit/product-edit.component';
import { ProductSettingsComponent } from './product-settings/product-settings.component';

@NgModule({
  declarations: [
    ProductSettingsComponent,
    ProductCreateComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SettingsModule { }
