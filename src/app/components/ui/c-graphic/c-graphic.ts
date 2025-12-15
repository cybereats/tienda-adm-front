import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  fill: ApexFill;
  colors: string[];
};

@Component({
  selector: 'c-graphic',
  imports: [ChartComponent],
  templateUrl: './c-graphic.html',
  styleUrl: './c-graphic.scss',
})
export class CGraphic implements OnChanges {
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
        type: "bar",
        toolbar: {
          show: false
        }
      },
      title: {
        text: ""
      },
      fill: {
        colors: []
      },
      stroke: {
        colors: []
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
      fill: {
        colors: this.colors
      },
      stroke: {
        colors: this.colors
      },
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