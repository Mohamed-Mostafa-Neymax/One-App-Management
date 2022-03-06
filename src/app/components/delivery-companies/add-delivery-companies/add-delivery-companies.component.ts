import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import * as mapboxgl from 'mapbox-gl';

import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-delivery-companies',
  templateUrl: './add-delivery-companies.component.html',
  styleUrls: ['./add-delivery-companies.component.scss']
})
export class AddDeliveryCompaniesComponent implements OnInit {

  AddCompanyForm: FormGroup;

  constructor( private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService ) { }
  ngOnInit(): void {
    this.AddCompanyForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'confirm_password': new FormControl(null, Validators.required)
    })
  }

  files: File[] = [];
  imagesObj = {}
  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    formData.append("files[0]", this.files[0]);
    this.globalService.uploadImage(formData).subscribe( imgStringRes => this.imagesObj['image'] = imgStringRes['files'][0] );
  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit() {
    console.log('submitted Form', {...this.AddCompanyForm.value, ...this.imagesObj});
    this.spinner.show();
    this.globalService.addDeliveryCompany({...this.AddCompanyForm.value, ...this.imagesObj}).subscribe( addCompanyRes => {
      console.log('addCompanyRes', addCompanyRes);
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم أضافة شركة الشحن بنجاح',
        'success'
      );
      this.dialog.closeAll();
    });
  }
}
