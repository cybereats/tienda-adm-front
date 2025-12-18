import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductsResponse, CategoryProduct } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service';
import { CSearchBar } from '../../ui/c-search-bar/c-search-bar';
import { CProductCard } from '../../ui/c-product-card/c-product-card';
import { CPagination } from '../../ui/c-pagination/c-pagination';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CPopup } from '../../ui/c-popup/c-popup';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, CSearchBar, CPagination, CProductCard],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  products: Product[] = [];
  size: number = 10;
  currentPage: number = 1;
  totalElements: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentPage = params['page'] ? Number.parseInt(params['page']) : 1;
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.productService.getAll<ProductsResponse>(this.currentPage, this.size).subscribe({
      next: (data: ProductsResponse) => {
        this.products = data.data;
        this.totalElements = data.totalElements;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  get totalPages() {
    return Math.ceil(this.totalElements / this.size) || 1;
  }

  openCreateDialog(): void {
    const newProduct: Product = {
      id: 0,
      label: '',
      slug: '',
      description: '',
      price: 0,
      // Default empty category, user will provide name
      category: { id: 0, label: '', slug: '' }
    };

    // We pass 'categoryName' in the data so CPopup renders an input for it.
    // We EXCLUDE 'category' object so CPopup doesn't try to render it.
    const dialogData = {
      ...newProduct,
      categoryName: ''
    };

    const dialogRef = this.dialog.open(CPopup, {
      panelClass: 'c-popup',
      width: '500px',
      data: {
        mode: 'create',
        data: dialogData,
        title: 'Producto',
        excludedFields: ['slug', 'category']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // 1. Generate Product Slug
        const productSlug = this.productService.generateSlug(result.label);

        // 2. Extract Category Name and fetch valid Category
        const categoryName = result.categoryName;
        const categorySlug = this.productService.generateSlug(categoryName);
        console.log('Category slug:', categorySlug);

        this.productService.getCategoryBySlug(categorySlug).subscribe({
          next: (fetchedCategory) => {
            console.log('Category fetched:', fetchedCategory);

            // 3. Compose final product with fetched category
            const productToCreate = {
              ...newProduct,
              ...result,
              slug: productSlug,
              category: fetchedCategory
            };
            productToCreate.id = null;

            // 4. Send POST
            this.productService.post<Product>(productToCreate).subscribe({
              next: (createdProduct) => {
                console.log('Product created:', createdProduct);
                this.loadProducts();
              },
              error: (error) => {
                console.error('Error creating product:', error);
              }
            });
          },
          error: (err) => {
            console.error('Category not found for slug:', categorySlug, err);
          }
        });

      }
    });
  }

  openEditDialog(product: Product): void {
    const dialogData = {
      ...product,
      categoryName: product.category?.label || ''
    };

    const dialogRef = this.dialog.open(CPopup, {
      panelClass: 'c-popup',
      width: '500px',
      data: {
        mode: 'edit',
        data: dialogData,
        title: 'Producto',
        excludedFields: ['slug', 'category']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Products: Edit dialog closed. Result:', result);
      if (result) {
        const categoryName = result.categoryName;
        const categorySlug = this.productService.generateSlug(categoryName);

        this.productService.getCategoryBySlug(categorySlug).subscribe({
          next: (fetchedCategory) => {
            const updatedProduct = {
              ...product,
              ...result,
              category: fetchedCategory
            };
            delete (updatedProduct as any).categoryName;

            this.productService.put<Product>(product.slug, updatedProduct).subscribe({
              next: (updatedProduct) => {
                console.log('Product updated:', updatedProduct);
                this.loadProducts();
              },
              error: (error) => {
                console.error('Error updating product:', error);
              }
            });
          },
          error: (err) => {
            console.error('Category not found for slug:', categorySlug, err);
          }
        });
      }
    });
  }

  openDeleteDialog(product: Product): void {
    const dialogRef = this.dialog.open(CPopup, {
      panelClass: 'c-popup',
      width: '400px',
      data: {
        mode: 'delete',
        data: product,
        title: 'Producto'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Products: Delete dialog closed. Result:', result);
      if (result) {
        // Use slug if typical for this API, otherwise ID. 
        // Given the PUT error explicitly checked path vs body slug, DELETE likely uses slug too.
        this.productService.delete(product.slug || product.id.toString()).subscribe({
          next: () => {
            console.log('Product deleted:', product);
            this.loadProducts(); // Reload the list
          },
          error: (error) => {
            console.error('Error deleting product:', error);
          }
        });
      }
    });
  }
}
