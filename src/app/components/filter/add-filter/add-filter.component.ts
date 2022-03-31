import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-filter',
  templateUrl: './add-filter.component.html',
  styleUrls: ['./add-filter.component.scss']
})
export class AddFilterComponent implements OnInit {

  AddFilterForm: FormGroup;

  constructor( private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.AddFilterForm = new FormGroup({
      'name_ar': new FormControl(null, Validators.required),
      'name_en': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    this.spinner.show();
    this.globalService.addFilter(this.AddFilterForm.value).subscribe( addFilterRes => {
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم أضافة التصفية بنجاح',
        'success'
      );
      this.dialog.closeAll();
      this.AddFilterForm.reset();
    });
  }
}
