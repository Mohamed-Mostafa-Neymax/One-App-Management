import { ListCityComponent } from './list-city/list-city.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCityComponent } from './add-city/add-city.component';

const routes: Routes = [
  {path:'list',component:ListCityComponent},
  {path:'add',component: AddCityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
