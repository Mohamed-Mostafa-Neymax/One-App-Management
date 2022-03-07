import { AddCityComponent } from './add-city/add-city.component';
import { ListCityComponent } from './list-city/list-city.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityRoutingModule } from './city-routing.module';
import { EditCityComponent } from './edit-city/edit-city.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListCityComponent, AddCityComponent, EditCityComponent],
  imports: [
    CommonModule,
    CityRoutingModule,
    ReactiveFormsModule 
  ]
})
export class CityModule { }
