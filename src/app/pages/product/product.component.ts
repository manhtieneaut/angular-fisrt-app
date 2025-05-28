import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule], // cần để dùng *ngFor, | currency
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products = [
    {
      id: 1,
      title: 'Smartphone X',
      price: 799.99,
      description: 'Latest smartphone with advanced features',
      category: 'electronics',
      brand: 'TechCo',
      stock: 50,
      image: 'https://fakeapi.net/images/smartphone.jpg',
      specs: {
        color: 'black',
        weight: '180g',
        storage: '128GB'
      },
      rating: {
        rate: 4.5,
        count: 120
      }
    },
    {
      id: 2,
      title: 'Laptop Pro 15',
      price: 1299.99,
      description: 'High-performance laptop for professionals',
      category: 'electronics',
      brand: 'DevTech',
      stock: 20,
      image: 'https://fakeapi.net/images/laptop.jpg',
      specs: {
        color: 'silver',
        weight: '2kg',
        storage: '512GB'
      },
      rating: {
        rate: 4.7,
        count: 85
      }
    }
  ];
}
