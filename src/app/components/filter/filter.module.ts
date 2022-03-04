import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FilterRoutingModule } from './filter-routing.module';

import { AddFilterComponent } from './add-filter/add-filter.component';
import { EditFilterComponent } from './edit-filter/edit-filter.component';
import { AppendFilterShopComponent } from './append-filter-shop/append-filter-shop.component';
import { ListFilterComponent } from './list-filter/list-filter.component';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
    declarations: [AddFilterComponent, EditFilterComponent, AppendFilterShopComponent, ListFilterComponent],
    imports: [
        CommonModule,
        NgxDropzoneModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FilterRoutingModule,
        MatSelectModule,
        NgMultiSelectDropDownModule.forRoot()
    ]
})
export class FilterModule { }
