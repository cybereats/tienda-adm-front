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
import { Report, ReportResponse, ReportStats } from '../../../../models/report.model';

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
      this.currentPage = params['page'] ? parseInt(params['page']) : 1;
      this.size = params['size'] ? parseInt(params['size']) : 10;
      this.loadReports();
      this.loadStats();
    });


  }

  loadReports() {
    this.reportService.getAll<ReportResponse>(this.currentPage, this.size).subscribe({
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
        this.stats.pending = stats.PENDING;
        this.stats.inProgress = stats.IN_PROGRESS;
        this.stats.resolved = stats.RESOLVED;
        this.stats.total = this.stats.pending + this.stats.inProgress + this.stats.resolved;
      },
      error: (error) => {
        console.error('Error al cargar las estadísticas:', error);
      }
    });
  }

  updateReportStatus(report: Report, newStatus: string) {
    const updatedReport = { ...report, status: newStatus };
    this.reportService.put<Report>(report.id.toString(), updatedReport).subscribe({
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
