import { EditTagComponent } from './../edit-tag/edit-tag.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

import { GlobalService } from './../../../services/global.service';
@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.scss']
})
export class ListTagsComponent implements OnInit {

  tagsArr;

  constructor( private globalService: GlobalService, private spinner: NgxSpinnerService, private dialog: MatDialog ) { }
  ngOnInit(): void {
    this.onListTags()
  }

  onListTags(){
    this.globalService.listTags().subscribe( tagsRes => {
      this.tagsArr = tagsRes['data'];
      console.log('tagsArr', this.tagsArr);
    });
  }

  onEditTag(tag){
    let dialogRef = this.dialog.open( EditTagComponent, {
      data: tag,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe( res =>{
      this.onListTags();
    });
  }

  onDeleteTag(tag_id){
    this.spinner.show();
    this.globalService.deleteTag(tag_id).subscribe( deleteRes =>{
      console.log('deleteRes', deleteRes);
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف العلامة بنجاح',
        'success'
      )
      this.onListTags();
    })
  }
}
