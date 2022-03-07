import { GlobalService } from './../../../services/global.service';
import Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ordersArr = [];
  orderType: string = 'new';
  
  constructor(private dialog:MatDialog, private globalService: GlobalService, private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.onShowOrder_Req(0);
  }

  onShowOrder_Req(status_id: number, ship_id?: number) {
    this.spinner.show();
    if( !ship_id ) {
      this.globalService.showOrdersBy_Status_id(status_id).subscribe( ordersRes => {
        this.spinner.hide();
        console.log('ordersRes', ordersRes);
        this.ordersArr = ordersRes['data'];
      });
    } else {
      this.globalService.showOrdersBy_Status_id(status_id).subscribe( ordersResFlter => {
        this.spinner.hide();
        console.log('ordersResFlter', ordersResFlter);
        this.ordersArr = ordersResFlter['data'].filter( val => val?.shipment_step_id == ship_id );
      });
    }
  }
  
  currectStatus_id;
  currectFilterType;
  onFilter(filterType: string, status_id: number, shipment_step_id?: number) {
    this.ordersArr = [];
    this.orderType = filterType;
    this.currectStatus_id = status_id;
    this.currectFilterType = filterType;
    this.onShowOrder_Req(status_id, shipment_step_id);
  }
  // appList(){
  //   this.service.allApplications().pipe(map(res=>res['data'])).subscribe(res=>{
  //     console.log('res')
  //     console.log(res)
  //     console.log(res)
  //     console.log(res)
  //   })
  // }


  onUpdateOrder(order_id: number, shipment_id: number) {
    this.spinner.show();
    this.globalService.updateOrderStatus({shop_order_id: order_id, shipment_step_id: shipment_id}).subscribe(updateRes => {
      console.log(updateRes);
      // this.onShowOrder_Req(this.currectStatus_id, shipment_id);
      // this.onFilter(this.currectFilterType, this.currectStatus_id, shipment_id);
      this.spinner.hide();
        Swal.fire(
          'نجاح',
          'تم نقل الطلب بنجاح',
          'success'
        )
    });
  }


  deleteApp(){
    Swal.fire(
      'نجاح',
      'تم حذف التطبيق بنجاح',
      'success'
      )
  }
  orderDetails(orderDetails){
    let dialogRef = this.dialog.open(OrderDetailsComponent, {
      data: orderDetails,
      height: '600px',
      width: '600px',
    });
  }
}
