import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-delivery-fee',
  templateUrl: './show-edit-delivery-fee.component.html',
  styleUrls: ['./show-edit-delivery-fee.component.scss']
})
export class ShowEditDeliveryFeeComponent implements OnInit {

  activateInputs = false;
  addMode = null;
  editForm: FormGroup
  deliveryFee = {};

  constructor(private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.onDetailDeliveryFee();
    this.editForm = new FormGroup({
      'price_per_km': new FormControl(null, Validators.required)
    });
  }
  
  onDetailDeliveryFee() {
    this.globalService.showDeliveryFee().subscribe( (deliveryFeeRes: any) => {
      console.log('deliveryFeeRes', deliveryFeeRes);
      this.deliveryFee = deliveryFeeRes['data'];
      this.addMode = deliveryFeeRes['status'] == true ? false : true;
      console.log('addition Mode', this.addMode);
      
    });
  }

  onActiveEditing() {
    this.activateInputs = true;
  }

  onSubmit() {
    this.spinner.show();
    if( this.addMode ) {
      this.globalService.addDeliveryFee(this.editForm.value).subscribe( addDeliveryFee => {
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
    } else {
      this.globalService.editDeliveryFee(this.editForm.value).subscribe( editedDeliveryFeeRes => {
        this.spinner.hide();
        console.log('editedDeliveryFeeRes', editedDeliveryFeeRes);
        this.onDetailDeliveryFee();
        this.activateInputs = false;
        Swal.fire(
          'نجاح',
          'تم تعديل رسم التوصيل بنجاح',
          'success'
        );
      });
    }
    
  }
}
