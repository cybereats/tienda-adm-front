import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CStatus } from '../../ui/c-status/c-status';
import { CPagination } from '../../ui/c-pagination/c-pagination';
import { CSearchBar } from '../../ui/c-search-bar/c-search-bar';
import { CFilterSelect, FilterOption } from '../../ui/c-filter-select/c-filter-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, CStatus, CPagination, CSearchBar, CFilterSelect],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  orders = Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    orderId: `#ORD-${(i + 1).toString().padStart(3, '0')}`,
    customer: ['Juan Pérez', 'Ana García', 'Carlos López', 'María Rodriguez', 'David Smith'][Math.floor(Math.random() * 5)],
    status: ['pending', 'completed', 'shipped'][Math.floor(Math.random() * 3)],
    price: `${(Math.random() * 100 + 20).toFixed(2)}€`,
    date: new Date(2025, 11, Math.floor(Math.random() * 30) + 1).toLocaleDateString()
  }));

  statusFilterOptions: FilterOption[] = [
    { value: 'pending', label: 'Pendiente' },
    { value: 'completed', label: 'Completado' },
    { value: 'shipped', label: 'Enviado' }
  ];

  statusOptions = [
    { value: 'pending', label: 'Pendiente', color: 'orange' },
    { value: 'completed', label: 'Completado', color: 'green' },
    { value: 'shipped', label: 'Enviado', color: 'blue' },
    { value: 'cancelled', label: 'Cancelado', color: 'red' }
  ];

  itemsPerPage: number = 10;
  currentPage: number = 1;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['page']) {
        this.currentPage = parseInt(params['page']);
      } else {
        this.currentPage = 1;
      }
    });
  }
  get paginatedOrders() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.orders.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.orders.length / this.itemsPerPage);
  }
}
