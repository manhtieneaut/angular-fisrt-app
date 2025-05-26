import { Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { ProductComponent } from './layout/product/product.component';
import { SettingComponent } from './layout/setting/setting.component';
import { ReportComponent } from './layout/report/report.component';


export const routes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  // route mặc định
  { path: 'dashboard', component: DashboardComponent},
  { path: 'product', component: ProductComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'report', component: ReportComponent },


];
