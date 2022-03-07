import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditCityComponent } from '../edit-city/edit-city.component';

@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.scss']
})
export class ListCityComponent implements OnInit {
 
  cityForm:FormGroup ;
  country_id:number ;
  countries:[];
  cities:[];
  check = false ;
  constructor(private dialog:MatDialog, private globalService: GlobalService , private spinner:NgxSpinnerService) { }


  ngOnInit(): void {

    this.globalService.allCountries().subscribe( countries=>{
    this.countries=countries['data'];
      }) 
     
      this.cityForm =new FormGroup({
        'allCountries' : new FormControl(null , Validators.required),
        
      })
  }
  
  onCountryChange(id){
    this.country_id = id ;
    this.globalService.getCityByCountryId(this.country_id).subscribe(cities=>{
      this.cities= cities['data']   ;
      this.check = true;
    });
    // console.log(this.country_id);
  }

  onEditCountry(city) {
    let dialogRef = this.dialog.open(EditCityComponent, {
      data:city,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe( res => {
   
      this.onCountryChange(this.country_id);
    })
  }
  onDeleteCountry(id) {
    this.spinner.show();
    this.globalService.deleteCity(id).subscribe(res =>{
     this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف المدينة بنجاح',
        'success'
      )
      this.dialog.closeAll();
      this.onCountryChange(this.country_id);
     
    });
    
  }
}

  