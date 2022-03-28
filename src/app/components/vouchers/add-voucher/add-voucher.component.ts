import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-voucher',
  templateUrl: './add-voucher.component.html',
  styleUrls: ['./add-voucher.component.scss']
})
export class AddVoucherComponent implements OnInit {

  addVoucherForm: FormGroup;

  voucherSettings = {};
  voucherList = [];

  constructor( private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService ) { }
  ngOnInit(): void {
    this.addVoucherForm = new FormGroup({
      'code': new FormControl(null, Validators.required),
      'discount': new FormControl(null, Validators.required),
      'type': new FormControl(null, Validators.required),
      'min_order': new FormControl(null, Validators.required),
      'max_order': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      'time': new FormControl('00:00', Validators.required)
    });

    this.voucherList = [{programaticValue: 'percent', showedValue: 'نسبة مئوية'}, {programaticValue: 'fixed', showedValue: 'خصم ثابت'}];
    this.voucherSettings = {
      singleSelection: true,
      idField: 'programaticValue',
      textField: 'showedValue',
      // selectAllText: 'اختيار الكل ',
      unSelectAllText: 'الغاء الاختيار',
      itemsShowLimit: 10,
      allowSearchFilter: false,
      closeDropDownOnSelection: true
    };
  }

  onSelectShop(item: any) {
    console.log(item);
  }
  onSelectAllShops(items: any) {
    console.log(items);
  }

  onSubmit() {
    console.log('old value', this.addVoucherForm.value);
    let prepared_obj = {
      code: this.addVoucherForm.value.code,
      discount: this.addVoucherForm.value.discount,
      type: this.addVoucherForm.value.type[0].programaticValue,
      min_order: this.addVoucherForm.value.min_order,
      max_order: this.addVoucherForm.value.max_order,
      expired_at: this.addVoucherForm.value.date + ' ' + this.addVoucherForm.value.time + ':00'
    }
    console.log('prepared_obj', prepared_obj);
    this.spinner.show();
    this.globalService.addVoucher(prepared_obj).subscribe( addVoucherRes => {
      console.log('addVoucherRes', addVoucherRes);
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم أضافة الكوبون بنجاح',
        'success'
      );
      this.dialog.closeAll();
    });
  }

}
