import { AddCityComponent } from './add-city/add-city.component';
import { ListCityComponent } from './list-city/list-city.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityRoutingModule } from './city-routing.module';
import { EditCityComponent } from './edit-city/edit-city.component';



@NgModule({
  declarations: [ListCityComponent, AddCityComponent, EditCityComponent],
  imports: [
    CommonModule,
    CityRoutingModule
  ]
})
export class CategoryModule { }
