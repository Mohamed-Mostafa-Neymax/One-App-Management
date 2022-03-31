import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

import { GlobalService } from './../../../services/global.service';
import { DetailShopComponent } from './../detail-shop/detail-shop.component';

@Component({
  selector: 'app-list-shops',
  templateUrl: './list-shops.component.html',
  styleUrls: ['./list-shops.component.scss']
})
export class ListShopsComponent implements OnInit {
  
  shopsArr;
  isActiveStatus = 0;

  constructor( private globalService: GlobalService, private spinner:NgxSpinnerService, private dialog:MatDialog) { }
  ngOnInit(): void {
    this.onListShops(this.isActiveStatus);
  }


  onListShops(isActive: number){
    this.isActiveStatus = isActive;
    this.globalService.listShops().subscribe( shopsRes => {
      console.log(shopsRes['data']);
      this.shopsArr = shopsRes['data'].filter( shop => shop?.is_active == isActive );
    } );
  }

  onDetailShop(shop) {
    let dialogRef = this.dialog.open( DetailShopComponent, {
      data: shop,
      height: '600px',
      width: '600px',
    });
  }

  onDeleteShop(shop_id){
    this.spinner.show();
    this.globalService.deleteShop(shop_id).subscribe( deleteRes =>{
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف المتجر بنجاح',
        'success'
      )
      this.onListShops(this.isActiveStatus);
    })
  }

  onChangeStatus(shop_id, status_id) {
    this.spinner.show();
    this.globalService.manageUsers(shop_id, status_id).subscribe( updateUserRes => {
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم تعديل حالة المتجر بنجاح',
        'success'
      );
    });
  }
}
