import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductsResponse } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  products: Product[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentPage = params['page'] ? parseInt(params['page']) : 1;
    });
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: ProductsResponse) => {
        this.products = data.data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.itemsPerPage) || 1;
  }

  get pages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const range: number[] = [];

    let start: number;
    let end: number;

    if (current === 1) {
      start = 1;
      end = Math.min(3, total);
    } else if (current === total) {
      start = Math.max(1, total - 2);
      end = total;
    } else {
      start = current - 1;
      end = current + 1;
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
