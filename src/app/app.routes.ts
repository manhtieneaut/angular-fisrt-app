import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { CustomLayoutComponent } from './layout/custom-layout/custom-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/home/home.component').then(m => m.HomeComponent),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component').then(m => m.AboutComponent),
        data: { breadcrumb: 'About' }
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact.component').then(m => m.ContractComponent),
        data: { breadcrumb: 'Contract' }
      }
    ]
  },


  {
    path: 'admin',
    component: AdminLayoutComponent,
    data: { breadcrumb: 'Admin' },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: { breadcrumb: 'Dashboard' }
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./pages/product/product.component').then(m => m.ProductComponent),
        data: { breadcrumb: 'Product' }
      },
      {
        path: 'setting',
        loadComponent: () =>
          import('./pages/setting/setting.component').then(m => m.SettingComponent),
        data: { breadcrumb: 'Setting' }
      },
       {
        path: 'users',
        loadComponent: () =>
          import('./pages/user/user.component').then(m => m.UserComponent),
        data: { breadcrumb: 'Users' }
      },
      {
        path: 'report',
        loadComponent: () =>
          import('./pages/report/report.component').then(m => m.ReportComponent),
        data: { breadcrumb: 'Report' }
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  
];