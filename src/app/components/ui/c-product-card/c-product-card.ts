import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'c-product-card',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './c-product-card.html',
    styleUrl: './c-product-card.scss',
})
export class CProductCard {
    @Input() product!: Product;
    @Output() edit = new EventEmitter<Product>();
    @Output() delete = new EventEmitter<Product>();

    onEdit(): void {
        this.edit.emit(this.product);
    }

    onDelete(): void {
        this.delete.emit(this.product);
    }
}
