import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

import { GlobalService } from './../../../services/global.service';
import { DetailVoucherComponent } from './../detail-voucher/detail-voucher.component';
import { EditVoucherComponent } from './../edit-voucher/edit-voucher.component';

@Component({
  selector: 'app-list-vouchers',
  templateUrl: './list-vouchers.component.html',
  styleUrls: ['./list-vouchers.component.scss']
})
export class ListVouchersComponent implements OnInit {

  vouchesArr;

  constructor( private globalService: GlobalService, private spinner:NgxSpinnerService, private dialog:MatDialog) { }
  ngOnInit(): void {
    this.onListVouchers();
  }

  onListVouchers(){
    this.globalService.listVouchers().subscribe( shopsRes => this.vouchesArr = shopsRes['data'] );
  }
  
  onDetailVoucher(voucher) {
    let dialogRef = this.dialog.open( DetailVoucherComponent, {
      data: voucher,
      height: '600px',
      width: '600px',
    });
  }

  onEditVoucher(voucher){
    let dialogRef = this.dialog.open( EditVoucherComponent, {
      data: voucher,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe( res =>{
      this.onListVouchers();
    });
  }

  onDeleteVoucher(voucher_id){
    this.spinner.show();
    this.globalService.deleteVoucher(voucher_id).subscribe( deleteRes => {
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف الكوبون بنجاح',
        'success'
      )
      this.onListVouchers();
    })
  }
}
