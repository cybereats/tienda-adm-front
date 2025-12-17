import { Component } from '@angular/core';
import { CGraphic } from '../../ui/c-graphic/c-graphic';
import { StatsService } from '../../../../services/stats.service';

@Component({
  selector: 'app-stats',
  imports: [CGraphic],
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class Stats {
  barSeries: any[] = [];
  barCategories: string[] = [];
  barColors: string[] = [];

  lineSeries: any[] = [];
  lineCategories: string[] = [];
  lineColors: string[] = [];

  areaSeries: any[] = [];
  areaCategories: string[] = [];
  areaColors: string[] = [];

  splineSeries: any[] = [];
  splineCategories: string[] = [];
  splineColors: string[] = [];

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.loadMonthlyIncome();
    this.loadMonthlyUsers();
    this.loadMonthlyReports();
    this.loadIncomeVsCosts();
  }

  loadMonthlyIncome() {
    this.statsService.getMonthlyIncome().subscribe(data => {
      this.barSeries = data.series;
      this.barCategories = data.categories;
      this.barColors = data.colors;
    });
  }

  loadMonthlyUsers() {
    this.statsService.getMonthlyUsers().subscribe(data => {
      this.lineSeries = data.series;
      this.lineCategories = data.categories;
      this.lineColors = data.colors;
    });
  }

  loadMonthlyReports() {
    this.statsService.getMonthlyReports().subscribe(data => {
      this.areaSeries = data.series;
      this.areaCategories = data.categories;
      this.areaColors = data.colors;
    });
  }

  loadIncomeVsCosts() {
    this.statsService.getIncomeVsCosts().subscribe(data => {
      this.splineSeries = data.series;
      this.splineCategories = data.categories;
      this.splineColors = data.colors;
    });
  }
}
