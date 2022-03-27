import { ListParcelsComponent } from './list-parcels/list-parcels.component';
import { ListOrdersComponent } from './list-orders/list-orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {path:'list-orders', component: ListOrdersComponent, data: { title: 'أظهار جميع الطلبات' }},
    {path:'list-parcels', component: ListParcelsComponent, data: { title: 'أظهار جميع الطرود' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsOrdersParcelsRoutingModule { }
