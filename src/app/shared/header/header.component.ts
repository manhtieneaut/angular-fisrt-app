import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary" class="header">
      <ng-content select="app-breadcrumb"></ng-content>
      <span class="spacer"></span>
      <div class="right-group" *ngIf="user$ | async as user">
        <span class="username">Hi, {{ user.username }}</span>
        <button mat-button (click)="logout()" aria-label="Logout">
          <mat-icon>logout</mat-icon>
          Logout
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header {
      position: sticky;
      top: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      padding: 0 24px;
      background:rgb(140, 183, 225); /* màu primary Angular Material */
      color: white;
      height: 64px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      font-weight: 600;
      user-select: none;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .right-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .username {
      font-size: 14px;
      opacity: 0.85;
      white-space: nowrap;
    }
  `]
})
export class HeaderComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  user$ = this.auth.user$;

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
