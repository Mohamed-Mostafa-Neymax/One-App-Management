import { AddShopComponent } from './add-shop/add-shop.component';
import { ListShopsComponent } from './list-shops/list-shops.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path:'list', component: ListShopsComponent, data: { title: 'قائمة المتاجر' }},
    {path:'add', component: AddShopComponent, data: { title: 'أضافة متجر' }},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopsRoutingModule { }
