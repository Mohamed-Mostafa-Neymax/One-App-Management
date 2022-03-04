import { DeliveryCompaniesRoutingModule } from './delivery-companies-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgxDropzoneModule,
        FormsModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        DeliveryCompaniesRoutingModule,
        NgMultiSelectDropDownModule.forRoot()
    ]
})
export class DeliveryCompaniesModule { }
