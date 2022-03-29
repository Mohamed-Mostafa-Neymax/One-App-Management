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
  }

}
