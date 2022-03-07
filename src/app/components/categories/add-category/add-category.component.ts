import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GlobalService } from 'src/app/services/global.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  type:number ;
  categoryForm: FormGroup;
  constructor(private globalService: GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      'name_ar': new FormControl(null, Validators.required),
      'name_en': new FormControl(null, Validators.required),
      // 'image' :new FormControl(null, Validators.required) ,
      'type':new FormControl(null,Validators.required),

    });
    
   }

  onTypeChange(val) {
    this.type=val ; 
  }


  files: File[] = [];
  imagesObj = {}

  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    formData.append("files[0]", this.files[0]);
    this.globalService.uploadImage(formData).subscribe( imgStringRes => {
      // console.log(imgStringRes);
      this.imagesObj['image'] = imgStringRes['files'][0];
      console.log(this.imagesObj);
    });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSubmit(){
    console.log(this.categoryForm.value) ;
    this.spinner.show();
    this.globalService.addAdminCategory({...this.categoryForm.value ,  ...this.imagesObj}).subscribe( res => {
      console.log( res)
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم إضافة الفئة بنجاح',
        'success'
    )
    
    })
    
  
  }

}
