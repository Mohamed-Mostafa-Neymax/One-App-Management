import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-append-filter-shop',
  templateUrl: './append-filter-shop.component.html',
  styleUrls: ['./append-filter-shop.component.scss']
})
export class AppendFilterShopComponent implements OnInit {

  filterForm: FormGroup;

  shopSettings = {};
  shopList = [];

  filterSettings = {};
  filterList = [];

  constructor( private globalService: GlobalService, private dialog: MatDialog, private spinner: NgxSpinnerService ) { }
  ngOnInit(): void {
    this.filterForm = new FormGroup({
      'shop_id': new FormControl(null, Validators.required),
      'filter_id': new FormControl(null, Validators.required)
    });
    this.onAll_Shops_Filters()
    
    // this.filterList = [{programaticValue: 0, showedValue: 'مجاني'}, {programaticValue: 1, showedValue: 'له سعر'}];
    this.filterSettings = {
          singleSelection: true,
          idField: 'id',
          textField: 'name_ar',
          // selectAllText: 'اختيار الكل ',
          unSelectAllText: 'الغاء الاختيار',
          itemsShowLimit: 10,
          allowSearchFilter: false,
          closeDropDownOnSelection: true
    };

    // this.shopList = [{programaticValue: 0, showedValue: 'مجاني'}, {programaticValue: 1, showedValue: 'له سعر'}];
    this.shopSettings = {
          singleSelection: false,
          idField: 'id',
          textField: 'name_ar',
          // selectAllText: 'اختيار الكل ',
          unSelectAllText: 'الغاء الاختيار',
          itemsShowLimit: 10,
          allowSearchFilter: false,
          closeDropDownOnSelection: true
    };
  }

  onAll_Shops_Filters() {
    this.globalService.listFilters().subscribe( filtersRes => this.filterList = filtersRes['data'] );
    this.globalService.listShops().subscribe( shopsRes => this.shopList = shopsRes['data'] );
  }

  onSelectShop(item: any) {
    console.log(item);
  }
  onSelectAllShops(items: any) {
    console.log(items);
  }
  
  onSelectFilter(item: any) {
    console.log(item);
  }
  onSelectAllFilters(items: any) {
    console.log(items);
  }

  onSubmit() {
    console.log(this.filterForm.value);
    this.spinner.show();
    for( let c = 0; c < this.filterForm.value.shop_id.length; c++ ) {
      this.globalService.appendFilterShop(
        {filter_id: this.filterForm.value.filter_id[0]['id'], shop_id: this.filterForm.value.shop_id[c]['id']})
        .subscribe( addFilterShopRes => {
        this.spinner.hide();
        Swal.fire(
          'نجاح',
          'تم أضافة التصفية للمتجر بنجاح',
          'success'
        );
        this.dialog.closeAll();
        console.log('addFilterShopRes', addFilterShopRes);
      });
    }
  }
}
