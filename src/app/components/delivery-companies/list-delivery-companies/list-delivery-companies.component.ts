import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

import { GlobalService } from './../../../services/global.service';
import { DetailDeliveryCompanyComponent } from './../detail-delivery-company/detail-delivery-company.component';

@Component({
  selector: 'app-list-delivery-companies',
  templateUrl: './list-delivery-companies.component.html',
  styleUrls: ['./list-delivery-companies.component.scss']
})
export class ListDeliveryCompaniesComponent implements OnInit {

  companiesArr;

  constructor( private globalService: GlobalService, private spinner:NgxSpinnerService, private dialog:MatDialog) { }
  ngOnInit(): void {
    this.onListCompanies();
  }

  onListCompanies(){
    this.globalService.listDeliveryCompanies().subscribe( companiesRes => this.companiesArr = companiesRes['data'] );
  }

  onDetailCompany(company) {
    let dialogRef = this.dialog.open( DetailDeliveryCompanyComponent, {
      data: company,
      height: '600px',
      width: '600px',
    });
  }

  onDeleteCompany(company_id){
    this.spinner.show();
    this.globalService.deleteDeliveryCompanies(company_id).subscribe( deleteCompany => {
      console.log('delete Company', deleteCompany);
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف الشركة بنجاح',
        'success'
      )
      this.onListCompanies();
    })
  }
}
