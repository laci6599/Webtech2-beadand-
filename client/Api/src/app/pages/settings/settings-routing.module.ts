import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductEditComponent } from './product-settings/product-edit/product-edit.component';
import { ProductSettingsComponent } from './product-settings/product-settings.component';

const routes: Routes = [
  { path: 'product', component: ProductSettingsComponent },
  { path: 'product/edit/:id', component: ProductEditComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
