import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GlobalService } from './../../../services/global.service';

@Component({
  selector: 'app-edit-voucher',
  templateUrl: './edit-voucher.component.html',
  styleUrls: ['./edit-voucher.component.scss']
})
export class EditVoucherComponent implements OnInit {

  editVoucherForm: FormGroup;

  constructor(private dialog: MatDialog, private globalService: GlobalService, @Inject(MAT_DIALOG_DATA) public data:any, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    console.log(this.data);
    // let splitHistory = this.data.expired_at.split(' ');
    let time = this.data.expired_at.split(' ')[1].split('');
    let finalTime = '';
    for( let c = 0; c < 3; c++ ) time.pop();
    for( let z = 0; z < time.length; z++ ) finalTime += time[z];
    let date = this.data.expired_at.split(' ')[0]
    console.log('date', date);
    console.log('finalTime', finalTime);
    
    this.editVoucherForm = new FormGroup({
      'code': new FormControl(this.data.code, Validators.required),
      'discount': new FormControl(this.data.discount, Validators.required),
      'type': new FormControl(this.data.type, Validators.required),
      'min_order': new FormControl(this.data.min_order, Validators.required),
      'max_order': new FormControl(this.data.max_order, Validators.required),
      'date': new FormControl(date, Validators.required),
      'time': new FormControl(finalTime, Validators.required)
    })
  }

  onSubmit() {
    console.log('old value', this.editVoucherForm.value);
    let prepared_obj = {
      code: this.editVoucherForm.value.code,
      discount: this.editVoucherForm.value.discount,
      type: this.editVoucherForm.value.type,
      min_order: this.editVoucherForm.value.min_order,
      max_order: this.editVoucherForm.value.max_order,
      expired_at: this.editVoucherForm.value.date + ' ' + this.editVoucherForm.value.time + ':00'
    }
    console.log('prepared_obj', prepared_obj);
    this.spinner.show();
    this.globalService.editVoucher({...prepared_obj, voucher_id: this.data.id}).subscribe( addVoucherRes => {
      console.log('addVoucherRes', addVoucherRes);
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم تعديل الكوبون بنجاح',
        'success'
      );
      this.dialog.closeAll();
    });
  }
}
