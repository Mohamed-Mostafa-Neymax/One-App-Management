import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }

  // Filter Requests
  addFilter(filterObj) { return this.http.post(`${environment.endpoint}/admin/filter/create`, filterObj); }
  editFilter(filterObj) { return this.http.post(`${environment.endpoint}/admin/filter/edit`, filterObj); }
  appendFilterShop(filterShopObj) { return this.http.post(`${environment.endpoint}/admin/filter/append`, filterShopObj); }
  deleteFilter(filter_id_Obj) { return this.http.delete(`${environment.endpoint}/admin/filter/delete?filter_id=${filter_id_Obj}`); }
  listFilters() { return this.http.get(`${environment.endpoint}/filters/all`); }
  
  // Tags Requests
  addTag(tagObj) { return this.http.post(`${environment.endpoint}/admin/hometag/create`, tagObj); }
  editTag(tagObj) { return this.http.post(`${environment.endpoint}/admin/hometag/edit`, tagObj); }
  appendTagShop(tagShopObj) { return this.http.post(`${environment.endpoint}/admin/hometag/append`, tagShopObj); }
  removeTagShop(tagShopObj) { return this.http.post(`${environment.endpoint}/admin/hometag/remove`, tagShopObj); }
  deleteTag(tag_id_Obj) { return this.http.delete(`${environment.endpoint}/admin/hometag/delete?home_tag_id=${tag_id_Obj}`); }
  listTags() { return this.http.get(`${environment.endpoint}/user/hometags/all`); }
  
  // Shops Requests
  addShop(shopObj) {
    const formData = new FormData();
    for( let key in shopObj ) {
      if( key == 'shop_categories' ) {
        for( let c = 0; c < shopObj['shop_categories'].length; c++ ) {
          formData.append('shop_categories['+c+']', shopObj['shop_categories'][c].id);
        }
      } else if( key == 'shop_subcategories' ) {
        for( let c = 0; c < shopObj['shop_subcategories'].length; c++ ) {
          formData.append('shop_subcategories['+c+']', shopObj['shop_subcategories'][c].id);
        }
      } else {
        formData.append(key, shopObj[key]);
      }
    }
    return this.http.post(`${environment.endpoint}/admin/shop/register`, formData);
  }
  deleteShop(shop_id_Obj) { return this.http.delete(`${environment.endpoint}/admin/shop/delete?shop_id=${shop_id_Obj}`); }
  listShops() { return this.http.get(`${environment.endpoint}/admin/shops/all`); }
  
  // Categories
  listCategories(filter_type) { return this.http.get(`${environment.endpoint}/user/categories/all?type=${filter_type}`); }
  listSubCategories(category_id) { return this.http.get(`${environment.endpoint}/user/subcategories/all?category_ids[0]=${category_id}`); }

  // Delivery Companies Requests
  addDeliveryCompany(Company_obj) { return this.http.post(`${environment.endpoint}/admin/delivery/company/register`, Company_obj); }
  deleteDeliveryCompanies(id) { return this.http.delete(`${environment.endpoint}/admin/delivery/company/delete?delivery_company_id=${id}`); }
  listDeliveryCompanies() { return this.http.get(`${environment.endpoint}/admin/delivery/company/all`); }

  // Vouchers
  addVoucher(voucher_obj) { return this.http.post(`${environment.endpoint}/admin/voucher/create`, voucher_obj); }
  editVoucher(voucher_obj) { return this.http.post(`${environment.endpoint}/admin/voucher/edit`, voucher_obj); }
  deleteVoucher(id) { return this.http.delete(`${environment.endpoint}/admin/voucher/delete?voucher_id=${id}`); }
  listVouchers() { return this.http.get(`${environment.endpoint}/admin/vouchers/all`); }


  // Category
  // allCategories(){
  //   return this.http.get(`${environment.endpoint}/shop/categories/all`);
  // }
  // allCategoriesDeliveryServices() {
  //   return this.http.get(`${environment.endpoint}/user/categories/all?type=2`);
  // }
  // addCategory(category){
  //   return this.http.post(`${environment.endpoint}/shop/category/add`, category)
  // }
  // deleteCategory(category_id){
  //   return this.http.delete(`${environment.endpoint}/admin/category/delete?category_id=${category_id}`)
  // }
  
  uploadImage(f){
    return this.http.post(`${environment.endpoint}/user/files/add`, f);
  }

  // // Products Requests
  // getProducts() { return this.http.get(`${environment.endpoint}/shop/products/all`); }
  // editProduct(product) { return this.http.post(`${environment.endpoint}/shop/product/edit`, product); }
  // deleteProduct(product_id) { return this.http.delete(`${environment.endpoint}/shop/product/delete?shop_product_id=${product_id}`); }
  // addProduct(basicData, arrOfFiles?) {
  //   const formData: FormData = new FormData();
  //   for( let z = 0; z < basicData['shop_product_category_ids'].length; z++ ) {
  //     formData.append('shop_product_category_ids'+'['+z+']', basicData['shop_product_category_ids'][z].id);
  //   }
  //   formData.append('name_ar', basicData.name_ar);
  //   formData.append('name_en', basicData.name_en);
  //   formData.append('description_ar', basicData.description_ar);
  //   formData.append('description_en', basicData.description_en);
  //   formData.append('price', basicData.price);
  //   formData.append('discount_percent', basicData.discount_percent);
  //   formData.append('price_after_discount', basicData.price_after_discount);
  //   formData.append('image', basicData.image);
  //   formData.append('has_options', basicData.has_options);
  //   if( basicData.has_options == 1 ) {
  //     for (let c = 0; c < arrOfFiles.length; c++) {
  //       formData.append('options_title['+c+']', arrOfFiles[c]?.options_title);
  //       formData.append('options_type['+c+']', arrOfFiles[c]['options_type'][0]?.programaticValue);
  //       formData.append('options_price_type['+c+']', arrOfFiles[c]['options_price_type'][0]?.programaticValue);
  //       for( let v = 0; v < arrOfFiles[c]['options'].length; v++ ) {
  //         formData.append('options_choice_name_ar['+c+']'+'['+v+']', arrOfFiles[c]['options'][v]['options_choice_name_ar']);
  //         formData.append('options_choice_name_en['+c+']'+'['+v+']', arrOfFiles[c]['options'][v]['options_choice_name_en']);
  //         formData.append('options_choice_description_ar['+c+']'+'['+v+']', arrOfFiles[c]['options'][v]['options_choice_description_ar']);
  //         formData.append('options_choice_description_en['+c+']'+'['+v+']', arrOfFiles[c]['options'][v]['options_choice_description_en']);
  //         formData.append('options_choice_price['+c+']'+'['+v+']', arrOfFiles[c]['options'][v]['options_choice_price']);
  //         formData.append('options_choice_price_after_discount['+c+']'+'['+v+']', arrOfFiles[c]['options'][v]['options_choice_price']);
  //       }
  //     }
  //   }
  //   return this.http.post(`${environment.endpoint}/shop/product/add`, formData);
  // }
  
  // // Profile Requests
  // editProfile(profileForm) {
  //   return this.http.post(`${environment.endpoint}/shop/edit`, profileForm);
  // }


  // // orders Requests
  // showOrdersBy_Status_id(shop_order_status_id: number) {
  //   return this.http.get(`${environment.endpoint}/shop/orders?shop_order_status_id=${shop_order_status_id}`);
  // }
  // showOrderBy_id(shop_order_id: number) {
  //   return this.http.get(`${environment.endpoint}/shop/order/show-by-id?shop_order_id=${shop_order_id}`);
  // }
  // updateOrderStatus(shipmentObj) {
  //   return this.http.post(`${environment.endpoint}/shop/order/shipment/update`, shipmentObj);
  // }
  // updateExcelFile(f){
  //   const  formData = new FormData()
  //   formData.append('file',f)
  //     console.log(f)
  //   return this.http.post(`${environment.endpoint}/shop/import-excel`,formData);
  // }
}
