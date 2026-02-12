import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CStatus } from '../../ui/c-status/c-status';
import { CPagination } from '../../ui/c-pagination/c-pagination';
import { CSummaryCard } from '../../ui/c-summary-card/c-summary-card';
import { CSearchBar } from '../../ui/c-search-bar/c-search-bar';
import { CFilterSelect, FilterOption } from '../../ui/c-filter-select/c-filter-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../../services/report.service';
import type { Report, ReportResponse, ReportStats } from '../../../../models/report.model';

import { CResetFilters } from '../../ui/c-reset-filters/c-reset-filters';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, CStatus, CPagination, CSummaryCard, CSearchBar, CFilterSelect, CResetFilters],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports {

  reportService = inject(ReportService);
  // reports = Array.from({ length: 150 }, (_, i) => ({
  //   id: i + 1,
  //   reportId: `#REP-${(i + 1).toString().padStart(3, '0')}`,
  //   user: ['Juan Pérez', 'Ana García', 'Carlos López', 'María Rodriguez', 'David Smith'][Math.floor(Math.random() * 5)],
  //   pc: `PC-${Math.floor(Math.random() * 50) + 1}`,
  //   issue: ['Error al iniciar sesión', 'Pantalla azul', 'Teclado no funciona', 'Internet lento', 'Software no abre'][Math.floor(Math.random() * 5)],
  //   status: ['pending', 'in-progress', 'resolved'][Math.floor(Math.random() * 3)],
  //   date: new Date(2025, 11, Math.floor(Math.random() * 30) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60)).toLocaleString()
  // }));

  reports: Report[] = [];
  totalPages: number = 0;
  totalElements: number = 0;

  stats = {
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  };

  statusFilterOptions: FilterOption[] = [
    { value: 'OPEN', label: 'Abierto' },
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'IN_PROGRESS', label: 'En Proceso' },
    { value: 'RESOLVED', label: 'Resuelto' }
  ];

  statusOptions = [
    { value: 'OPEN', label: 'Abierto', color: 'gray' },
    { value: 'PENDING', label: 'Pendiente', color: 'orange' },
    { value: 'IN_PROGRESS', label: 'En Proceso', color: 'blue' },
    { value: 'RESOLVED', label: 'Resuelto', color: 'green' }
  ];

  size: number = 10;
  currentPage: number = 1;

  filterText: string = '';
  filterStatus: string = '';
  filterDate: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentPage = params['page'] ? parseInt(params['page']) : 1;
      this.size = params['size'] ? parseInt(params['size']) : 10;
      this.filterText = params['text'] || '';
      this.filterStatus = params['status'] || '';
      this.filterDate = params['date'] || '';

      this.loadReports();
      this.loadStats();
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

  private updateQueryParams(newParams: any) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: newParams,
      queryParamsHandling: 'merge'
    });
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


  loadReports() {
    this.reportService.search<ReportResponse>(
      this.currentPage,
      this.size,
      this.filterText,
      this.filterStatus,
      this.filterDate
    ).subscribe({
      next: (response) => {
        this.reports = response.data;
        this.totalPages = Math.ceil(response.totalElements / this.size);
        this.totalElements = response.totalElements;
        console.log(this.reports);
      },
      error: (error) => {
        console.error('Error al cargar los reportes:', error);
      }
    });
  }

  loadStats() {
    this.reportService.getStatusCount().subscribe({
      next: (stats) => {
        this.stats.pending = stats.PENDING || 0;
        this.stats.inProgress = stats.IN_PROGRESS || 0;
        this.stats.resolved = stats.RESOLVED || 0;
        const open = stats.OPEN || 0;
        this.stats.total = this.stats.pending + this.stats.inProgress + this.stats.resolved + open;
      },
      error: (error) => {
        console.error('Error al cargar las estadísticas:', error);
      }
    });
  }

  updateReportStatus(report: Report, newStatus: string) {
    // Create the correct request format expected by the backend
    const updatedReport = {
      id: report.id,
      userId: report.user.id,
      pcId: report.pc.id,
      description: report.description,
      subject: report.subject,
      status: newStatus,
      createdAt: report.createdAt,
      priority: report.priority
    };

    this.reportService.put<any>(report.id.toString(), updatedReport).subscribe({
      next: (response) => {
        report.status = newStatus;
        this.loadStats();
        console.log('Report status updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating report status:', error);
      }
    });
  }
}
