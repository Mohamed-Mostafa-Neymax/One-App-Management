import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-delivery-fee',
  templateUrl: './add-delivery-fee.component.html',
  styleUrls: ['./add-delivery-fee.component.scss']
})
export class AddDeliveryFeeComponent implements OnInit {

  addDeliveryFeeForm: FormGroup;

  constructor(private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.addDeliveryFeeForm = new FormGroup({
      'price_per_km': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    console.log('addDeliveryFeeForm', this.addDeliveryFeeForm.value);
    this.spinner.show();
    this.globalService.addDeliveryFee(this.addDeliveryFeeForm.value).subscribe( addDeliveryFee => {
      console.log('addDeliveryFee', addDeliveryFee);
      this.spinner.hide();
      if( !addDeliveryFee['errors'] ) {
        Swal.fire(
          'نجاح',
          'تم أضافة رسم التوصيل بنجاح',
          'success'
        );
      } else {
        Swal.fire(
          'فشلت الأضافة',
          'رسم التوصيل موجود بالفعل',
          'success'
        );
      }
      this.dialog.closeAll();
    });
  }
}
