import { Component } from '@angular/core';
import { CGraphic } from '../../ui/c-graphic/c-graphic';
import { StatsService } from '../../../../services/stats.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-index',
  imports: [CGraphic, CurrencyPipe],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class Index {
  dailyIncome = 0
  dailyBookings = 0
  activeBookings = { total: 0, occupied: 0 }

  barSeries: any[] = []
  barCategories: string[] = []
  barColors = ["#7600A8"]

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.fetchDailyIncome()
    this.fetchDailyBookings()
    this.fetchActiveBookings()
    this.fetchDailySummary()
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
}
