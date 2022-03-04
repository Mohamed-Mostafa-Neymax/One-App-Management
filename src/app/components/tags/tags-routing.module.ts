import { RemoveTagShopComponent } from './remove-tag-shop/remove-tag-shop.component';
import { AppendTagShopComponent } from './append-tag-shop/append-tag-shop.component';
import { AddTagComponent } from './add-tag/add-tag.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTagsComponent } from './list-tags/list-tags.component';

const routes: Routes = [
    {path:'add', component: AddTagComponent, data: { title: ' إضافة علامة' }},
    {path:'append-tag-shop', component: AppendTagShopComponent, data: { title: 'إضافة علامة إلي متجر' }},
    {path:'remove-tag-shop', component: RemoveTagShopComponent, data: { title: 'حذف علامة من متجر' }},
    {path:'list', component: ListTagsComponent, data: { title: ' قائمة العلامات' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule { }
