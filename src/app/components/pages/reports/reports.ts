import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CStatus } from '../../ui/c-status/c-status';
import { CPagination } from '../../ui/c-pagination/c-pagination';
import { CSummaryCard } from '../../ui/c-summary-card/c-summary-card';
import { CSearchBar } from '../../ui/c-search-bar/c-search-bar';
import { CFilterSelect, FilterOption } from '../../ui/c-filter-select/c-filter-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, CStatus, CPagination, CSummaryCard, CSearchBar, CFilterSelect],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports {
  reports = Array.from({ length: 150 }, (_, i) => ({
    id: i + 1,
    reportId: `#REP-${(i + 1).toString().padStart(3, '0')}`,
    user: ['Juan Pérez', 'Ana García', 'Carlos López', 'María Rodriguez', 'David Smith'][Math.floor(Math.random() * 5)],
    pc: `PC-${Math.floor(Math.random() * 50) + 1}`,
    issue: ['Error al iniciar sesión', 'Pantalla azul', 'Teclado no funciona', 'Internet lento', 'Software no abre'][Math.floor(Math.random() * 5)],
    status: ['pending', 'in-progress', 'resolved'][Math.floor(Math.random() * 3)],
    date: new Date(2025, 11, Math.floor(Math.random() * 30) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60)).toLocaleString()
  }));

  stats = {
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  };

  statusFilterOptions: FilterOption[] = [
    { value: 'pending', label: 'Pendiente' },
    { value: 'in-progress', label: 'En Proceso' },
    { value: 'resolved', label: 'Resuelto' }
  ];

  statusOptions = [
    { value: 'pending', label: 'Pendiente', color: 'orange' },
    { value: 'in-progress', label: 'En Proceso', color: 'blue' },
    { value: 'resolved', label: 'Resuelto', color: 'green' }
  ];

  itemsPerPage: number = 10;
  currentPage: number = 1;

  constructor(private activatedRoute: ActivatedRoute) {
    this.calculateStats();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['page']) {
        this.currentPage = parseInt(params['page']);
      } else {
        this.currentPage = 1;
      }
    });
  }

  calculateStats() {
    this.stats.total = this.reports.length;
    this.stats.pending = this.reports.filter(r => r.status === 'pending').length;
    this.stats.inProgress = this.reports.filter(r => r.status === 'in-progress').length;
    this.stats.resolved = this.reports.filter(r => r.status === 'resolved').length;
  }

  get paginatedReports() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.reports.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.reports.length / this.itemsPerPage);
  }
}
