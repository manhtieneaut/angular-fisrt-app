import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    BreadcrumbComponent,
    HeaderComponent

  ],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {

  private auth = inject(AuthService);
  private router = inject(Router);

  user$ = this.auth.user$;


  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
