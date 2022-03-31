import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-parcel-details',
  templateUrl: './parcel-details.component.html',
  styleUrls: ['./parcel-details.component.scss']
})
export class ParcelDetailsComponent implements OnInit {

  parcelDetailsObj;
  extractDate;

  constructor(private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.parcelDetailsObj = this.data;
    this.extractDate = new Date(this.data.created_at);
    console.log(this.parcelDetailsObj);

    setTimeout(() => {
      const map2 = new mapboxgl.Map({
        accessToken: 'pk.eyJ1IjoiYmFzZW0xMjEyMTk5NCIsImEiOiJja3g1dTJrYnQxYXB6MzBvMWdrcjd5MXFmIn0.YtJZRMq7vvX4T3PGiHj70Q',
        container: "map2Id",
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [this.parcelDetailsObj?.from_address?.lat, this.parcelDetailsObj?.to_address?.lng], // starting position [lng, lat]
        zoom: 14 // starting zoom
      });
      const marker1 = new mapboxgl.Marker({ color: 'black'}).setLngLat([this.parcelDetailsObj?.from_address?.lat, this.parcelDetailsObj?.from_address?.lng]).addTo(map2);
      const marker2 = new mapboxgl.Marker({ color: 'red'}).setLngLat([this.parcelDetailsObj?.to_address?.lat, this.parcelDetailsObj?.to_address?.lng]).addTo(map2);
    }, 1000);
  }

}
