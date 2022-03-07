import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})

export class AddCityComponent implements OnInit {
  cityForm:FormGroup ;
  country_id:number ;
  countries:[];
  cities:[];
  constructor(private globalService: GlobalService , private spinner:NgxSpinnerService) { }


  ngOnInit(): void {

    this.globalService.allCountries().subscribe( countries=>{
     this.countries=countries['data'];
      }) 
     
      this.cityForm =new FormGroup({
        'allCountries' : new FormControl(null , Validators.required),
        'allCities':new FormControl(null , Validators.required) ,
        'name_ar':new FormControl(null , Validators.required) ,
        'name_en' :new FormControl(null , Validators.required) 
      })
  }
  onCountryChange(id){
    this.country_id=id ;
    this.globalService.getCityByCountryId(this.country_id).subscribe(cities=>{
      this.cities= cities['data']   ;
    });  
  }

  onSubmit(){
    let country_id =this.country_id ;
    this.spinner.show();
    this.globalService.addCity({...this.cityForm.value , country_id}).subscribe( res => {
    this.spinner.hide();
    Swal.fire(
        'نجاح',
        'تم إضافة المدينة بنجاح',
        'success'
    )
    console.log(res) ;
    });
  }
}
