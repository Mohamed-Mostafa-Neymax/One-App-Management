import { AppendFilterShopComponent } from './append-filter-shop/append-filter-shop.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddFilterComponent } from './add-filter/add-filter.component';
import { ListFilterComponent } from './list-filter/list-filter.component';

const routes: Routes = [
    {path:'add', component:AddFilterComponent, data: { title: 'أضافة تصفية' }},
    {path:'list', component:ListFilterComponent, data: { title: 'قائمة التصفيات' }},
    {path:'append-filter-shop', component: AppendFilterShopComponent, data: { title: 'إضافة تصفية إلي متجر' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterRoutingModule { }
