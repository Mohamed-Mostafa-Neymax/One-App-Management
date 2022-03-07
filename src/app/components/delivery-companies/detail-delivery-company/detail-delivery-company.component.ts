import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-delivery-company',
  templateUrl: './detail-delivery-company.component.html',
  styleUrls: ['./detail-delivery-company.component.scss']
})
export class DetailDeliveryCompanyComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }
  ngOnInit(): void {
    console.log(this.data);
  }

}
