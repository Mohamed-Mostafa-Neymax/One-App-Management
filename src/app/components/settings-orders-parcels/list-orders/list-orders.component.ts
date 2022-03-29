import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

import { OrdersDetailsComponent } from './../orders-details/orders-details.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  ordersArr = [];
  orderType: string;
  searchForm: FormGroup;

  constructor(private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.onFilterOrders(0, 'new');
    this.searchForm = new FormGroup({
      'order_id': new FormControl(null, Validators.required)
    });
  }

  onFilterOrders(status_id: number, status_name: string) {
    this.orderType = status_name;
    this.spinner.show();
    this.globalService.listOrders(status_id).subscribe( ordersRes => {
      console.log('ordersRes', ordersRes);
      this.spinner.hide();
      this.ordersArr = ordersRes['data'].slice().sort( (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());;
    });
  }

  orderDetails(orderData) {
      let dialogRef = this.dialog.open( OrdersDetailsComponent, {
        data: orderData,
        height: '600px',
        width: '600px',
      });
  }
  
  onSelectOrderByID() {
    let orderDetails = this.ordersArr.find( singleOrder => singleOrder['id'] == this.searchForm.value.order_id );
    console.log(orderDetails);
    let dialogRef = this.dialog.open( OrdersDetailsComponent, {
      data: orderDetails,
      height: '600px',
      width: '600px',
    });
  }
}
