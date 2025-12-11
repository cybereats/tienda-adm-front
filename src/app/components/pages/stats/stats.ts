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

}
