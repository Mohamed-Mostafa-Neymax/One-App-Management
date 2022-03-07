import { NgModule } from '@angular/core';


import { CategoryRoutingModule } from './category-routing.module';
import { ListComponent } from './list/list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatIconModule} from '@angular/material/icon';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EditCategoryComponent } from './edit-category/edit-category.component';



@NgModule({
  declarations: [ListComponent,AddCategoryComponent, CategoryDetailsComponent, EditCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    NgxDropzoneModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class CategoryModule { }
