import { VouchersRoutingModule } from './vouchers-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddVoucherComponent } from './add-voucher/add-voucher.component';
import { EditVoucherComponent } from './edit-voucher/edit-voucher.component';
import { ListVouchersComponent } from './list-vouchers/list-vouchers.component';
import { DetailVoucherComponent } from './detail-voucher/detail-voucher.component';



@NgModule({
  declarations: [AddVoucherComponent, EditVoucherComponent, ListVouchersComponent, DetailVoucherComponent],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    VouchersRoutingModule,
    MatInputModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class VouchersModule { }
