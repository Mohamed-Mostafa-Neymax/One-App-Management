import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnInit {
cityForm:FormGroup ;
cities=[];
country_id:number ;
city_id :number ;
  constructor(private dialog:MatDialog , private globalService:GlobalService, @Inject(MAT_DIALOG_DATA) public data:any, private spinner:NgxSpinnerService) { }
 
  ngOnInit(): void {
    this.cityForm=new FormGroup({ 
      'country_name' :new FormControl(this.data.country.name_ar , Validators.required) ,
      'city_name':new FormControl(this.data.name_ar , Validators.required),
      'name_en': new FormControl(this.data.name_en , Validators.required),
      'name_ar': new FormControl(this.data.name_ar , Validators.required) ,
    })
    this.globalService.getCityByCountryId(this.data.country_id).subscribe(cities=>{
      this.cities= cities['data']   ;
    });
  }
  onSubmit(){
    this.spinner.show();
    this.globalService.editCity({city_id:this.data.id,...this.cityForm.value , country_id: this.data.country_id }).subscribe( res=> { 
    this.spinner.hide();
    Swal.fire(
        'نجاح',
        'تم تعديل المدينة بنجاح',
        'success'
    )
    this.dialog.closeAll();
    console.log(res);
    });
   
  }
}
