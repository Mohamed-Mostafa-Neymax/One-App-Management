import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

import { GlobalService } from './../../../services/global.service';
import { EditFilterComponent } from './../edit-filter/edit-filter.component';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnInit {

  filtersArr;

  constructor( private globalService: GlobalService, private spinner:NgxSpinnerService, private dialog:MatDialog) { }
  ngOnInit(): void {
    this.onListFilters();
  }


  onListFilters(){
    this.globalService.listFilters().subscribe( filtersRes => this.filtersArr = filtersRes['data'] );
  }

  onEditFilter(filter){
      let dialogRef = this.dialog.open( EditFilterComponent, {
        data: filter,
        height: '600px',
        width: '600px',
      });
      dialogRef.afterClosed().subscribe( res =>{
        this.onListFilters();
      });
    }

  onDeleteFilter(filter_id){
    this.spinner.show();
    this.globalService.deleteFilter(filter_id).subscribe( deleteRes => {
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف التصفية بنجاح',
        'success'
      );
      this.onListFilters();
    })
  }
}
