import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductsResponse, CategoryProduct } from '../models/product.model';
import { HTTPService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends HTTPService {
  override url = '/api/products';

  generateSlug(label: string): string {
    return label.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  getCategoryBySlug(slug: string): Observable<CategoryProduct> {
    return this.http.get<CategoryProduct>(`/api/category-products/${slug}`);
  }
}
