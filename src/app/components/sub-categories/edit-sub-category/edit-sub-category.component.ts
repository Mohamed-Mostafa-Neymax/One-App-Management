import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.scss']
})
export class EditSubCategoryComponent implements OnInit {
  subCategoryForm:FormGroup ; 
  categories = []  ;
  subcCategories=[]; 
  category_name :string ;
  id:number ;
  type:number ;
  check= true ; 
  componentRef: any;
   
  constructor(private dialog:MatDialog, private globalService:GlobalService, @Inject(MAT_DIALOG_DATA) public data:any, private spinner:NgxSpinnerService) { }
  
  ngOnInit(): void {
    this.subCategoryForm = new FormGroup({
     'type' : new FormControl(this.data.category.type , Validators.required), 
     'category_id' : new FormControl(this.data.category_id , Validators.required) ,
     'name_ar' : new FormControl(this.data.name_ar , Validators.required), 
     'name_en' : new FormControl(this.data.name_en , Validators.required), 
     
     
    })
   this.check=true ;
   
   
  }
 

  onTypeChange(val) {
    this.type=val ;
    this.globalService.allUserCategory(this.type).subscribe(categories=>{
      this.categories=categories['data'] ;
    })
    this.check=false;
  }
  onCategoryChange(category_id){
    this.id=category_id;
    
    this.globalService.allUserSubCategory(this.id).subscribe(subcategories=>{
      this.subcCategories=subcategories['data'] ;
    })
    this.check=false;
  }

  
  files: File[] = [];
  imagesObj = {} 
  onSelect(event) {
    this.files = [];
    this.files.push(...event.addedFiles);
     const formData = new FormData( );
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
    this.globalService.editAdminSubCategory({...this.subCategoryForm.value ,  ...this.imagesObj , subcategory_id:this.data.id}).subscribe( res => {
    console.log("ressss :")
      console.log(res);
    this.spinner.hide()
    Swal.fire(
        'نجاح',
        'تم تعديل الفئة الفرعية بنجاح',
        'success'
    )
    this.dialog.closeAll();
    });
    
  }
}
