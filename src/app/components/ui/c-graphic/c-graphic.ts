import { Component, ViewChild } from '@angular/core';
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
export class CGraphic {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      colors: ["#7600A8"],
      chart: {
        height: "100%",
        width: "100%",
        type: "bar"
      },
      title: {
        text: ""
      },
      fill: {
        colors: ["#7600A8"]
      },
      stroke: {
        colors: ["#7600A8"]
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      }
    };
  }
}