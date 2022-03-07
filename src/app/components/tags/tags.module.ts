import { TagsRoutingModule } from './tags-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddTagComponent } from './add-tag/add-tag.component';
import { ListTagsComponent } from './list-tags/list-tags.component';
import { RemoveTagShopComponent } from './remove-tag-shop/remove-tag-shop.component';
import { AppendTagShopComponent } from './append-tag-shop/append-tag-shop.component';
import { EditTagComponent } from './edit-tag/edit-tag.component';



@NgModule({
  declarations: [AddTagComponent, ListTagsComponent, RemoveTagShopComponent, AppendTagShopComponent, EditTagComponent],
  imports: [
    CommonModule,
    NgxDropzoneModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    TagsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class TagsModule { }
