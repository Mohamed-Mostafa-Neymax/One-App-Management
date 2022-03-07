import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {

  addTagForm: FormGroup;

  constructor( private globalService: GlobalService, private dialog:MatDialog, private spinner:NgxSpinnerService) { }
  ngOnInit(): void {
    this.addTagForm = new FormGroup({
      'name_ar': new FormControl(null, Validators.required),
      'name_en': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    this.spinner.show();
    this.globalService.addTag(this.addTagForm.value).subscribe( addTagRes => {
      this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم أضافة العلامة بنجاح',
        'success'
      );
      this.dialog.closeAll();
    });
  }
}
