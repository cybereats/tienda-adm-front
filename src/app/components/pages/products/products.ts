import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductsResponse } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service';
import { CSearchBar } from '../../ui/c-search-bar/c-search-bar';
import { CPagination } from '../../ui/c-pagination/c-pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, CSearchBar, CPagination],
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
      this.currentPage = params['page'] ? Number.parseInt(params['page']) : 1;
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
}
