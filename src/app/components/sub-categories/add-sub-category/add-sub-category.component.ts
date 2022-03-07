import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {
  subCategoryForm:FormGroup ; 
  categories=[]; 
  type:number ;
   
 
  constructor(private globalService: GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.subCategoryForm=new FormGroup({
      'type':new FormControl(null , Validators.required) ,
      'category_id' : new FormControl(null , Validators.required) ,
      'name_ar':new FormControl(null , Validators.required) ,
      'name_en':new FormControl(null , Validators.required) ,
    })
  }

  files: File[] = [];
  imagesObj = {}
  onTypeChange(val) {
    this.type=val ;
    this.globalService.allUserCategory(this.type).subscribe(categories=>{
      this.categories=categories['data'] ;
    })
  }
 
  // onCategoryChange(cat_id){
  //   this.category_id=cat_id ;
  // }
  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    formData.append("files[0]", this.files[0]);
    this.globalService.uploadImage(formData).subscribe( imgStringRes => {
      this.imagesObj['image'] = imgStringRes['files'][0];
     
    });
  }
 
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSubmit() {
   
    this.spinner.show();
    this.globalService.addAdminSubCategory({...this.subCategoryForm.value ,  ...this.imagesObj}).subscribe( res => {
      console.log( "res");
    console.log( res);
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم إضافة الفئة الفرعية بنجاح',
        'success'
    )
    
    })
    
  }
}
