import { Component } from '@angular/core';
import { CGraphic } from '../../ui/c-graphic/c-graphic';
import { StatsService } from '../../../../services/stats.service';
import { CurrencyPipe } from '@angular/common';
import { CSummaryCard } from "../../ui/c-summary-card/c-summary-card";
import { BookingService } from '../../../../services/booking.service';
import { Booking, BookingResponse } from '../../../../models/booking.model';

@Component({
  selector: 'app-index',
  imports: [CGraphic, CurrencyPipe, CSummaryCard],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class Index {
  dailyIncome = 0
  dailyBookings = 0
  activeBookings = { total: 0, occupied: 0 }
  bookings: Booking[] = []

  barSeries: any[] = []
  barCategories: string[] = []
  barColors = ["#7600A8"]

  constructor(private statsService: StatsService, private bookingService: BookingService) { }

  ngOnInit() {
    this.fetchDailyIncome()
    this.fetchDailyBookings()
    this.fetchActiveBookings()
    this.fetchDailySummary()
    this.fetchRecentBookings()
  }

  fetchDailyIncome() {
    this.statsService.getDailyIncome().subscribe(res => {
      this.dailyIncome = res.total
    })
  }

  fetchDailyBookings() {
    this.statsService.getDailyBookings().subscribe(res => {
      this.dailyBookings = res.count
    })
  }

  fetchActiveBookings() {
    this.statsService.getActiveBookings().subscribe(res => {
      this.activeBookings = res
    })
  }

  fetchDailySummary() {
    this.statsService.getDailySummary().subscribe(data => {
      const incomeByHour = new Array(24).fill(0);
      data.forEach(item => {
        if (item.hour >= 0 && item.hour < 24) {
          incomeByHour[item.hour] = item.income
        }
      })

      this.barCategories = Array.from({ length: 24 }, (_, i) => `${i}:00`)
      this.barSeries = [{
        name: "Ingresos por Hora",
        data: incomeByHour
      }]
    })
  }

  fetchRecentBookings() {
    this.bookingService.getAll<BookingResponse>(1, 10).subscribe(res => {
      this.bookings = res.data
    })
  }
}
