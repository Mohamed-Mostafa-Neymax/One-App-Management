import { NgModule } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AddDeliveryFeeComponent } from './add-delivery-fee/add-delivery-fee.component';
import { DeliveryFeeRoutingModule } from './delivery-fee-routing.module';
import { ShowEditDeliveryFeeComponent } from './show-edit-delivery-fee/show-edit-delivery-fee.component';



@NgModule({
    declarations: [AddDeliveryFeeComponent, ShowEditDeliveryFeeComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxDropzoneModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        DeliveryFeeRoutingModule,
        NgMultiSelectDropDownModule.forRoot()
    ]
})
export class DeliveryFeeModule { }
