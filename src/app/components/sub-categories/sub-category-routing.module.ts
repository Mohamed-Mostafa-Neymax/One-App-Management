import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { ListSubCategoriesComponent } from './list-sub-categories/list-sub-categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'list', component: ListSubCategoriesComponent},
  {path:'add', component: AddSubCategoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryRoutingModule { }
