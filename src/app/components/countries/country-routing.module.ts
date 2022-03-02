import { ListCountryComponent } from './list-country/list-country.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCountryComponent } from './add-country/add-country.component';

const routes: Routes = [
  {path:'list',component:ListCountryComponent},
  {path:'add',component: AddCountryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class countryRoutingModule { }
