import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { ListSubCategoriesComponent } from './list-sub-categories/list-sub-categories.component';
import { EditSubCategoryComponent } from './edit-sub-category/edit-sub-category.component';
import { DetailSubCategoryComponent } from './detail-sub-category/detail-sub-category.component';


@NgModule({
  declarations: [AddSubCategoryComponent, ListSubCategoriesComponent, EditSubCategoryComponent, DetailSubCategoryComponent],
  imports: [
    CommonModule,
    SubCategoryRoutingModule
  ]
})
export class SubCategoryModule { }
