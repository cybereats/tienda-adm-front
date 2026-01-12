import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CStatus } from '../../ui/c-status/c-status';
import { CPagination } from '../../ui/c-pagination/c-pagination';
import { CSearchBar } from '../../ui/c-search-bar/c-search-bar';
import { CFilterSelect, FilterOption } from '../../ui/c-filter-select/c-filter-select';
import { CResetFilters } from '../../ui/c-reset-filters/c-reset-filters';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../services/order.service';
import { Order, OrderItem, OrderResponse } from '../../../../models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, CStatus, CPagination, CSearchBar, CFilterSelect, CResetFilters],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {

  orderService = inject(OrderService);

  orders!: Order[];
  totalPages: number = 0;
  totalElements: number = 0;

  statusFilterOptions: FilterOption[] = [
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'CONFIRMED', label: 'Confirmado' },
    { value: 'SHIPPED', label: 'Enviado' },
    { value: 'DELIVERED', label: 'Entregado' },
    { value: 'CANCELLED', label: 'Cancelado' }
  ];

  statusOptions = [
    { value: 'PENDING', label: 'Pendiente', color: 'orange' },
    { value: 'CONFIRMED', label: 'Confirmado', color: 'blue' },
    { value: 'SHIPPED', label: 'Enviado', color: 'purple' },
    { value: 'DELIVERED', label: 'Entregado', color: 'green' },
    { value: 'CANCELLED', label: 'Cancelado', color: 'red' },
  ];

  size: number = 10;
  currentPage: number = 1;

  filterText: string = '';
  filterStatus: string = '';
  filterDate: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentPage = params['page'] ? Number.parseInt(params['page']) : 1;
      this.size = params['size'] ? Number.parseInt(params['size']) : 10;
      this.filterText = params['text'] || '';
      this.filterStatus = params['status'] || '';
      this.filterDate = params['date'] || '';
      this.loadOrders();
    });
  }

  onSearch(text: string) {
    this.updateQueryParams({ text, page: 1 });
  }

  onStatusChange(status: string) {
    this.updateQueryParams({ status, page: 1 });
  }

  onDateChange(event: Event) {
    const date = (event.target as HTMLInputElement).value;
    this.updateQueryParams({ date, page: 1 });
  }

  resetFilters() {
    this.filterText = '';
    this.filterStatus = '';
    this.filterDate = '';
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        text: null,
        status: null,
        date: null,
        page: 1
      },
      queryParamsHandling: 'merge'
    });
  }

  private updateQueryParams(newParams: any) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: newParams,
      queryParamsHandling: 'merge'
    });
  }

  loadOrders(): void {
    this.orderService.search<OrderResponse>(
      this.currentPage,
      this.size,
      this.filterText,
      this.filterStatus,
      this.filterDate
    ).subscribe({
      next: (orderResponse: OrderResponse) => {
        this.orders = orderResponse.data.map((order: Order) => {
          const items = order.orderItems || [];
          items.forEach((item: OrderItem) => {
            item.price = item.product.price * item.quantity;
          });

          order.totalPrice = items.reduce((acc: number, item: OrderItem) => acc + item.price, 0);
          return order;
        });
        this.totalElements = orderResponse.totalElements;
        this.totalPages = Math.ceil(orderResponse.totalElements / this.size);
        console.log(this.orders);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        console.error('Error details:', error.error);
      }
    });
  }

  updateOrderStatus(order: Order, newStatus: string) {
    const updatedOrder = { ...order, status: newStatus };
    console.log('Updating order status:', updatedOrder);
    this.orderService.put<Order>(order.id.toString(), updatedOrder).subscribe({
      next: (response) => {
        order.status = newStatus;
        console.log('Order status updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating order status:', error);
      }
    });
  }
}
