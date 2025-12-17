import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTPService } from './http.service';
import {
  DailyIncomeResponse,
  DailyBookingsResponse,
  ActiveBookingsResponse,
  DailySummaryItem,
  ChartDataResponse
} from '../models/stats.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private readonly baseUrl = '/api/stats';

  constructor(private httpService: HTTPService) { }

  getDailyIncome(): Observable<DailyIncomeResponse> {
    return this.httpService.getById<DailyIncomeResponse>(`${this.baseUrl}/daily-income`);
  }

  getDailyBookings(): Observable<DailyBookingsResponse> {
    return this.httpService.getById<DailyBookingsResponse>(`${this.baseUrl}/daily-bookings`);
  }

  getActiveBookings(): Observable<ActiveBookingsResponse> {
    return this.httpService.getById<ActiveBookingsResponse>(`${this.baseUrl}/active-bookings`);
  }

  getDailySummary(): Observable<DailySummaryItem[]> {
    return this.httpService.getAll<DailySummaryItem>(`${this.baseUrl}/daily-summary`);
  }

  getMonthlyIncome(): Observable<ChartDataResponse> {
    return this.httpService.getById<ChartDataResponse>(`${this.baseUrl}/monthly-income`);
  }

  getMonthlyUsers(): Observable<ChartDataResponse> {
    return this.httpService.getById<ChartDataResponse>(`${this.baseUrl}/monthly-users`);
  }

  getMonthlyReports(): Observable<ChartDataResponse> {
    return this.httpService.getById<ChartDataResponse>(`${this.baseUrl}/monthly-reports`);
  }

  getIncomeVsCosts(): Observable<ChartDataResponse> {
    return this.httpService.getById<ChartDataResponse>(`${this.baseUrl}/income-vs-costs`);
  }
}
