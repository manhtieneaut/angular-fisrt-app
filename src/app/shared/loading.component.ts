// shared/components/loading/loading.component.ts
import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading()" class="loading-overlay">
      <div class="spinner">Loading...</div>
    </div>
  `,
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  constructor(private loadingService: LoadingService) {}

  get isLoading() {
    return this.loadingService.isLoading;
  }
}
