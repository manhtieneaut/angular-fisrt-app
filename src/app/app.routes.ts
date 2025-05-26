import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { UserComponent } from './pages/user/user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


export const routes: Routes = [
{
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent },
      { path: 'product', component: ProductComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
