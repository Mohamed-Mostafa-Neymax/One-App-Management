import { AddShopComponent } from './add-shop/add-shop.component';
import { ShopsRoutingModule } from './shops-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DetailShopComponent } from './detail-shop/detail-shop.component';
import { ListShopsComponent } from './list-shops/list-shops.component';



@NgModule({
    declarations: [DetailShopComponent, ListShopsComponent, AddShopComponent],
    imports: [
        CommonModule,
        NgxDropzoneModule,
        ShopsRoutingModule,
        FormsModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgMultiSelectDropDownModule.forRoot(),
    ]
})
export class ShopsModule { }
