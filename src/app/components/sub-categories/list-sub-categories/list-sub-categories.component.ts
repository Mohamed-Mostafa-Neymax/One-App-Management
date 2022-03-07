import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
import { EditSubCategoryComponent } from '../edit-sub-category/edit-sub-category.component';

@Component({
  selector: 'app-list-sub-categories',
  templateUrl: './list-sub-categories.component.html',
  styleUrls: ['./list-sub-categories.component.scss']
})
export class ListSubCategoriesComponent implements OnInit {
  categories = [] ;
  subcCategories=[];
  check = false ;
  filterForm:FormGroup ;
  type:number ;
  id:number ;
  constructor(private dialog:MatDialog, private globalService: GlobalService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.filterForm=new FormGroup({
      'type' : new FormControl(null , Validators.required) ,
      'category' : new FormControl(null , Validators.required) ,
    })
  }

  onTypeChange(val) {
    this.type=val ; 
    this.globalService.allUserCategory(this.type).subscribe(categories=>{
     this.categories=categories['data'] ;
    })
  }
  onCategoryChange(category_id){
    this.id=category_id;
    
    this.globalService.allUserSubCategory(this.id).subscribe(subcategories=>{
      this.subcCategories=subcategories['data'] ;
    })
    this.check = true ;
  }

  subCategoryList(){
    this.globalService.allUserSubCategory(this.id).subscribe(subcategories=>{
      this.subcCategories=subcategories['data'] ;
    })
    this.check = true ;
  }
  onEditCat(subCategory){
    let dialogRef = this.dialog.open( EditSubCategoryComponent, {
      data: subCategory,
      height: '600px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe( res =>  this.subCategoryList() );
  }
  onDeleteCat(subCategory_id) {
    this.spinner.show();
    this.globalService.deleteAdminSubCategory(subCategory_id).subscribe(res =>{
     this.spinner.hide();
      Swal.fire(
        'نجاح',
        'تم حذف الفئة الفرعية بنجاح',
        'success'
      )
      this.dialog.closeAll();
     
      this.subCategoryList() ;
    });
  }

}
