import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-layout',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './custom-layout.component.html',
  styleUrl: './custom-layout.component.css'
})
export class CustomLayoutComponent {

}
