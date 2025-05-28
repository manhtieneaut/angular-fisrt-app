import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [
    NgFor

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  name: string = 'Tiến';
  age: number = 22;
  skills: string[] = ['Angular', 'TypeScript', 'HTML', 'CSS'];

  getGreeting(): string {
    return `Xin chào ${this.name}, bạn ${this.age} tuổi`;
  }
}
