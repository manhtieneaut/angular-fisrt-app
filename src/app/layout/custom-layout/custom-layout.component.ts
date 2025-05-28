import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink],
  templateUrl: './custom-layout.component.html',
  styleUrl: './custom-layout.component.css'
})
export class CustomLayoutComponent {

}
