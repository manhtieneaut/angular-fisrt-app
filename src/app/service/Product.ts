import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  stock: number;
  image: string;
  specs: {
    color: string;
    weight: string;
    storage: string;
  };
  rating: {
    rate: number;
    count: number;
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface ProductResponse {
  data: Product[];
  pagination: Pagination;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakeapi.net/products'; // thay url thật

  constructor(private http: HttpClient) {}

  getProducts(
    page: number = 1,
    limit: number = 10,
    category?: string,
    price?: { min: number; max: number }
  ): Observable<ProductResponse> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (category) {
      params = params.set('category', category);
    }
    if (price) {
      // Chuyển object price thành chuỗi JSON encode
      params = params.set('price', JSON.stringify(price));
    }

    return this.http.get<ProductResponse>(this.apiUrl, { params });
  }
}
