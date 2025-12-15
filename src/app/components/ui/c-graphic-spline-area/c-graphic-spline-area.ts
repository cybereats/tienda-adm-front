import { Component, ViewChild, Input, OnChanges, SimpleChanges } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: string[];
};

@Component({
  selector: 'c-graphic-spline-area',
  imports: [ChartComponent],
  templateUrl: './c-graphic-spline-area.html',
  styleUrl: './c-graphic-spline-area.scss',
})
export class CGraphicSplineArea {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  @Input() series: ApexAxisChartSeries = [];
  @Input() categories: string[] = [];
  @Input() colors: string[] = ["#00f514ff", "#cc0000ff"];
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
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "category",
        categories: []
      },

      title: {
        text: ""
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