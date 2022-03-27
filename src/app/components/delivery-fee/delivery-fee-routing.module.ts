import { ShowEditDeliveryFeeComponent } from './show-edit-delivery-fee/show-edit-delivery-fee.component';
import { AddDeliveryFeeComponent } from './add-delivery-fee/add-delivery-fee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {path:'add', component: AddDeliveryFeeComponent, data: { title: 'أضافة رسم توصيل' }},
    {path:'edit', component: ShowEditDeliveryFeeComponent, data: { title: 'أظهار وتعديل رسم توصيل' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryFeeRoutingModule { }
