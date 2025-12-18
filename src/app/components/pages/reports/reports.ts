import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CStatus } from '../../ui/c-status/c-status';
import { CPagination } from '../../ui/c-pagination/c-pagination';
import { CSummaryCard } from '../../ui/c-summary-card/c-summary-card';
import { CSearchBar } from '../../ui/c-search-bar/c-search-bar';
import { CFilterSelect, FilterOption } from '../../ui/c-filter-select/c-filter-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../../services/report.service';
import { Report, ReportResponse } from '../../../../models/report.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, CStatus, CPagination, CSummaryCard, CSearchBar, CFilterSelect],
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
    { value: 'pending', label: 'Pendiente' },
    { value: 'in-progress', label: 'En Proceso' },
    { value: 'resolved', label: 'Resuelto' }
  ];

  statusOptions = [
    { value: 'PENDING', label: 'Pendiente', color: 'orange' },
    { value: 'IN_PROGRESS', label: 'En Proceso', color: 'blue' },
    { value: 'RESOLVED', label: 'Resuelto', color: 'green' }
  ];

  size: number = 10;
  currentPage: number = 1;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['page']) {
        this.currentPage = parseInt(params['page']);
        this.size = parseInt(params['size']);
      } else {
        this.currentPage = 1;
        this.size = 10;
      }
      this.loadReports();
    });


  }

  loadReports() {
    this.reportService.getAll<ReportResponse>(this.currentPage, this.size).subscribe({
      next: (response) => {
        this.reports = response.data;
        this.totalPages = Math.ceil(response.totalElements / this.size);
        this.totalElements = response.totalElements;
        this.calculateStats();
        console.log(this.reports);
      },
      error: (error) => {
        console.error('Error al cargar los reportes:', error);
      }
    });
  }

  calculateStats() {
    this.stats.total = this.reports.length;
    this.stats.pending = this.reports.filter(r => r.status === 'PENDING').length;
    this.stats.inProgress = this.reports.filter(r => r.status === 'IN_PROGRESS').length;
    this.stats.resolved = this.reports.filter(r => r.status === 'RESOLVED').length;
  }

  updateReportStatus(report: Report, newStatus: string) {
    const updatedReport = { ...report, status: newStatus };
    this.reportService.put<Report>(report.id.toString(), updatedReport).subscribe({
      next: (response) => {
        report.status = newStatus;
        this.calculateStats();
        console.log('Report status updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating report status:', error);
      }
    });
  }
}
