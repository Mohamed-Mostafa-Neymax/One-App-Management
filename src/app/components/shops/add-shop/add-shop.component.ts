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

  constructor( private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService ) { }

  ngOnInit(): void {
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
      // that.newLat = lngLat.lat;
      // that.newLng = lngLat.lng;
      console.log(lngLat);
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
      'delivery_period': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    console.log(this.AddShopForm);
    
    // this.spinner.show();
    // this.globalService.addShop(this.AddShopForm.value).subscribe( addShopRes => {
    //   this.spinner.hide();
    //   Swal.fire(
    //     'نجاح',
    //     'تم أضافة المتجر بنجاح',
    //     'success'
    //   );
    //   this.dialog.closeAll();
    // });
  }

}
