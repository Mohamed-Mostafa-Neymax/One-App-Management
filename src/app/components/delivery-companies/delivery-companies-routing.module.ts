import { AddDeliveryCompaniesComponent } from './add-delivery-companies/add-delivery-companies.component';
import { ListDeliveryCompaniesComponent } from './list-delivery-companies/list-delivery-companies.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path:'list', component: ListDeliveryCompaniesComponent, data: { title: 'قائمة شركات الشحن' }},
    {path:'add', component: AddDeliveryCompaniesComponent, data: { title: 'أضافة شركة شحن' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryCompaniesRoutingModule { }
