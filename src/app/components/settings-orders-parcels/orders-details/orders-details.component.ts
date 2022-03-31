import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {

  orderDetailsObj;
  extractDate;

  constructor(private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.orderDetailsObj = this.data;
    this.extractDate = new Date(this.data.created_at);
    setTimeout(() => {
      const map2 = new mapboxgl.Map({
        accessToken: 'pk.eyJ1IjoiYmFzZW0xMjEyMTk5NCIsImEiOiJja3g1dTJrYnQxYXB6MzBvMWdrcjd5MXFmIn0.YtJZRMq7vvX4T3PGiHj70Q',
        container: "map2Id",
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [this.orderDetailsObj?.shop?.lat, this.orderDetailsObj?.shop?.lng], // starting position [lng, lat]
        zoom: 4 // starting zoom
      });
      const marker2 = new mapboxgl.Marker({ color: 'black'}).setLngLat([this.orderDetailsObj?.shop?.lat, this.orderDetailsObj?.shop?.lng]).addTo(map2);
    }, 1000);
  }

}
