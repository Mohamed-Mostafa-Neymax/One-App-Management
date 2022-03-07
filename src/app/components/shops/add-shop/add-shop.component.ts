import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import * as mapboxgl from 'mapbox-gl';

import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.scss']
})
export class AddShopComponent implements OnInit {

  AddShopForm: FormGroup;

  lat_lng_Obj = {lat: 30.0444, lng: 31.2357};

  
  categories_Settings_filter = {};
  categories_List_filter = [{programaticValue: 1, showedValue: 'خدمات إلكترونية'}, {programaticValue: 2, showedValue: 'خدمات توصيل'}];

  categories_Settings = {};
  categories_List = [];

  sub_Categories_Settings = {};
  sub_Categories_List = [];

  constructor( private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService ) { }
  ngOnInit(): void {
    let that = this;
    const map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiYmFzZW0xMjEyMTk5NCIsImEiOiJja3g1dTJrYnQxYXB6MzBvMWdrcjd5MXFmIn0.YtJZRMq7vvX4T3PGiHj70Q',
      container: "mapId",
      style: "mapbox://styles/mapbox/streets-v9",
      zoom: 6,
      center: [30.0444, 31.2357],
    });
    const marker = new mapboxgl.Marker({draggable: true}).setLngLat([30.0444, 31.2357]).addTo(map);
    function onDragEnd() {
      const lngLat = marker.getLngLat();
      that.lat_lng_Obj = lngLat;
      console.log(that.lat_lng_Obj);
    }
    marker.on('dragend', onDragEnd);

    this.AddShopForm = new FormGroup({
      'name_ar': new FormControl(null, Validators.required),
      'name_en': new FormControl(null, Validators.required),
      'description_ar': new FormControl(null, Validators.required),
      'description_en': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'confirm_password': new FormControl(null, Validators.required),
      'shop_categories': new FormControl(null, Validators.required),
      'shop_subcategories': new FormControl(null, Validators.required),
      'delivery_period': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
    })
    this.categories_Settings_filter = {
      singleSelection: true,
      idField: 'programaticValue',
      textField: 'showedValue',
      // selectAllText: 'اختيار الكل ',
      unSelectAllText: 'الغاء الاختيار',
      itemsShowLimit: 10,
      allowSearchFilter: false,
      closeDropDownOnSelection: true
    };
    this.categories_Settings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name_ar',
      // selectAllText: 'اختيار الكل ',
      unSelectAllText: 'الغاء الاختيار',
      itemsShowLimit: 10,
      allowSearchFilter: false,
      closeDropDownOnSelection: true
    };
    this.sub_Categories_Settings = {
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

  // DROPDOWN CODE 1
  onSelect_Filter(item: any) {
    console.log('selectedFilter', item);
    // categories_List
    this.globalService.listCategories(item.programaticValue).subscribe( categoriesRes => {
      console.log('categoriesRes', categoriesRes);
      this.categories_List = categoriesRes['data'];
    });
  }
  // DROPDOWN CODE 2
  onSelect_Category(item: any) {
    console.log(item);
    this.globalService.listSubCategories(item.id).subscribe( subCategoriesRes => {
      console.log('subCategoriesRes', subCategoriesRes);
      this.sub_Categories_List = subCategoriesRes['data'];
    });
  }
  onSelect_All_Categories(items: any) {
    console.log(items);
  }
  // DROPDOWN CODE 3
  onSelect_Sub_Category(item: any) {
    console.log(item);
  }
  onSelect_All_Sub_Categories(items: any) {
    console.log(items);
  }

  // IMAGE CODE
  files: File[] = [];
  files_2: File[] = [];
  imagesObj = {}
  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    formData.append("files[0]", this.files[0]);
    this.globalService.uploadImage(formData).subscribe( imgStringRes => this.imagesObj['image'] = imgStringRes['files'][0] );
  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSelect_2(event) {
    this.files_2 = [];
    this.files_2.push(...event.addedFiles);
    const formData = new FormData();
    formData.append("files[0]", this.files_2[0]);
    this.globalService.uploadImage(formData).subscribe( imgStringRes => this.imagesObj['cover_image'] = imgStringRes['files'][0] );
  }
  onRemove_2(event) {
    console.log(event);
    this.files_2.splice(this.files_2.indexOf(event), 1);
  }

  onSubmit() {
    this.spinner.show();
    this.globalService.addShop({...this.AddShopForm.value, ...this.imagesObj, ...this.lat_lng_Obj}).subscribe( addShopRes => {
      console.log('addShopRes', addShopRes);
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم أضافة المتجر بنجاح',
        'success'
      );
      this.dialog.closeAll();
    });
  }

}
