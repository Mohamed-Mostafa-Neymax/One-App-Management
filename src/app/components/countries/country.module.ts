import { AddCountryComponent } from './add-country/add-country.component';
import { ListCountryComponent } from './list-country/list-country.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { countryRoutingModule } from './country-routing.module';
import { EditCountryComponent } from './edit-country/edit-country.component';
import {ReactiveFormsModule } from '@angular/forms' ;
@NgModule({
  declarations: [ListCountryComponent, AddCountryComponent, EditCountryComponent],
  imports: [
    CommonModule,
    countryRoutingModule,
    ReactiveFormsModule
  ]
})
export class CountryModule { }
