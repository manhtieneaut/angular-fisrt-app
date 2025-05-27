import { Component,Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [
    NgIf
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
   @Input() isLoading: boolean = false;

}
