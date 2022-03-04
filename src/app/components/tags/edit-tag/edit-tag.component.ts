import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GlobalService } from './../../../services/global.service';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.scss']
})
export class EditTagComponent implements OnInit {

  editTagForm: FormGroup;

  constructor(private dialog: MatDialog, private globalService: GlobalService, @Inject(MAT_DIALOG_DATA) public data:any, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.editTagForm = new FormGroup({
      'name_ar': new FormControl(this.data.name_ar, Validators.required),
      'name_en': new FormControl(this.data.name_en, Validators.required),
    });  
  }

  onSubmit() {
    this.spinner.show();
    this.globalService.editTag({...this.editTagForm.value, home_tag_id: this.data.id}).subscribe( editRes => {
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم تعديل العلامة بنجاح',
        'success'
      );
      this.dialog.closeAll();
    });
  }

}
