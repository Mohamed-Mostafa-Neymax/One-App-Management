import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GlobalService } from './../../../services/global.service';

@Component({
  selector: 'app-edit-filter',
  templateUrl: './edit-filter.component.html',
  styleUrls: ['./edit-filter.component.scss']
})
export class EditFilterComponent implements OnInit {

  editfilterForm: FormGroup;

  constructor(private dialog: MatDialog, private globalService: GlobalService, @Inject(MAT_DIALOG_DATA) public data:any, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.editfilterForm = new FormGroup({
      'name_ar': new FormControl(this.data.name_ar, Validators.required),
      'name_en': new FormControl(this.data.name_en, Validators.required),
    });
  }

  onSubmit() {
    console.log('edited Form', {...this.editfilterForm.value, filter_id: this.data.id});
    this.spinner.show();
    this.globalService.editFilter({...this.editfilterForm.value, filter_id: this.data.id}).subscribe( editRes => {
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم تعديل التصفية بنجاح',
        'success'
      );
      this.dialog.closeAll();
    });
  }
}
