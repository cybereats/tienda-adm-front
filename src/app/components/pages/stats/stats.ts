import { Component } from '@angular/core';
import { CGraphic } from '../../ui/c-graphic/c-graphic';
import { CGraphicLine } from "../../ui/c-graphic-line/c-graphic-line";
import { CGraphicArea } from "../../ui/c-graphic-area/c-graphic-area";
import { CGraphicSplineArea } from "../../ui/c-graphic-spline-area/c-graphic-spline-area";

@Component({
  selector: 'app-stats',
  imports: [CGraphic, CGraphicLine, CGraphicArea, CGraphicSplineArea],
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class Stats {
  barSeries = [
    {
      name: "Ventas",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }
  ];
  barCategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  barColors = ["#7600A8"];

  lineSeries = [
    {
      name: "Usuarios",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }
  ];
  lineCategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  lineColors = ["#7600A8"];

  areaSeries = [
    {
      name: "Ventas",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }
  ];
  areaCategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  areaColors = ["#7600A8"];

  splineSeries = [
    {
      name: "Compras",
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: "Ventas",
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ];
  splineCategories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul"
  ];
  splineColors = ["#00f514ff", "#cc0000ff"];
}
