import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  colors: string[];
};

@Component({
  selector: 'c-graphic-area',
  imports: [ChartComponent],
  templateUrl: './c-graphic-area.html',
  styleUrl: './c-graphic-area.scss',
})
export class CGraphicArea {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  @Input() series: ApexAxisChartSeries = [];
  @Input() categories: string[] = [];
  @Input() colors: string[] = ["#7600A8"];
  @Input() height: string = "100%";

  constructor() {
    this.chartOptions = {
      series: [],
      colors: [],
      chart: {
        height: "100%",
        width: "100%",
        type: "area",
        toolbar: {
          show: false
        }
      },
      title: {
        text: ""
      },
      xaxis: {
        type: "category",
        categories: []
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = {
      ...this.chartOptions,
      series: this.series,
      colors: this.colors,
      xaxis: {
        ...this.chartOptions.xaxis,
        categories: this.categories
      },
      chart: {
        ...this.chartOptions.chart,
        height: this.height
      }
    };
  }
}