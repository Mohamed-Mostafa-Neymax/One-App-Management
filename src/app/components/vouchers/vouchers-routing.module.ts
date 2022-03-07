import { AddVoucherComponent } from './add-voucher/add-voucher.component';
import { ListVouchersComponent } from './list-vouchers/list-vouchers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path:'list', component: ListVouchersComponent, data: { title: 'قائمة الإيصالات' }},
    {path:'add', component: AddVoucherComponent, data: { title: 'أضافة إيصال' }}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VouchersRoutingModule { }
