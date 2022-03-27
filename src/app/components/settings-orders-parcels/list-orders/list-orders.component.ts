import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  ordersArr = [];
  orderType: string;

  constructor(private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.onFilterOrders(0, 'new');
  }

  onFilterOrders(status_id: number, status_name: string) {
    this.orderType = status_name;
    this.spinner.show();
    this.globalService.listOrders(status_id).subscribe( ordersRes => {
      console.log('ordersRes', ordersRes);
      this.spinner.hide();
      this.ordersArr = ordersRes['data'];
    });
  }
}
