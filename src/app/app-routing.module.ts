import { countryRoutingModule } from './components/countries/country-routing.module';
import { UsersModule } from './components/users/users.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WrongRouteComponent } from './components/auth/errors/wrong-route/wrong-route.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { CategoryModule } from './components/categories/category.module';
import { OrdersModule } from './components/orders/orders.module';
import { ServicesModule } from './components/services/services.module';
import { DeliversModule } from './components/delivers/delivers.module';
import { ReportsModule } from './components/reports/reports.module';
import { ProfileComponent } from './components/profile/profile.component';
import { NotificationModule } from './components/notification/notification.module';
import { ProductModule } from './components/products/product.module';
import { SubCategoryModule } from './components/sub-categories/sub-category.module';
import { CityRoutingModule } from './components/cities/city-routing.module';
import { CountryModule } from './components/countries/country.module';
import { CityModule } from './components/cities/city.module';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'auth/login',component:LoginComponent},
  {
    path: '',
    // canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: [
      // {path:'',component:HomeComponent, data: { title: 'الصفحة الرئيسية' }},
      {path:'home',component:HomeComponent, data: { title: 'تقارير الشركة' }},
      {path:'profile',component:ProfileComponent, data: { title: 'بيانات الشركة' }},
    ]
  },
  {
    path: 'app',
    // canActivate: [AuthGuard],
    component: DashboardLayoutComponent,
    children: [
      {path:'categories',loadChildren:()=>CategoryModule},
      {path:'sub-categories',loadChildren:()=>SubCategoryModule},
      {path:'country',loadChildren:()=>CountryModule},
      {path:'city',loadChildren:()=>CityModule},
      {path:'users',loadChildren:()=>UsersModule},
      {path:'orders',loadChildren:()=>OrdersModule},
      {path:'services',loadChildren:()=>ServicesModule},
      {path:'delivery',loadChildren:()=>DeliversModule},
      {path:'reports',loadChildren:()=>ReportsModule},
      {path:'product',loadChildren:()=>ProductModule},
      {path:'notification',loadChildren:()=>NotificationModule},
      
    ]
  },
  {
    path        : '**',
    pathMatch   : 'full',
    component   : WrongRouteComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
