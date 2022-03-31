import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

import { ParcelDetailsComponent } from './../parcel-details/parcel-details.component';

@Component({
  selector: 'app-list-parcels',
  templateUrl: './list-parcels.component.html',
  styleUrls: ['./list-parcels.component.scss']
})
export class ListParcelsComponent implements OnInit {
  parcelsArr = [];
  orderType: string;
  searchForm: FormGroup;

  constructor(private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.onFilterOrders(0, 'created');
    this.searchForm = new FormGroup({
      'order_id': new FormControl(null, Validators.required)
    });
  }
  onFilterOrders(shipment_step_id: number, status_name: string) {
    this.orderType = status_name;
    this.spinner.show();
    this.globalService.listParcels(shipment_step_id).subscribe( parcelsRes => {
      console.log('parcelsRes', parcelsRes);
      this.spinner.hide();
      this.parcelsArr = parcelsRes['data'].slice().sort( (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      console.log('parcelsArr', this.parcelsArr);
    });
  }

  parcelDetails(orderDetails) {
    let dialogRef = this.dialog.open( ParcelDetailsComponent, {
      data: orderDetails,
      height: '600px',
      width: '600px',
    });
  }

  onSelectOrderByID() {
    let orderDetails = this.parcelsArr.find( singleParcel => singleParcel['id'] == this.searchForm.value.order_id );
    console.log(orderDetails);
    let dialogRef = this.dialog.open( ParcelDetailsComponent, {
      data: orderDetails,
      height: '600px',
      width: '600px',
    });
  }
}
