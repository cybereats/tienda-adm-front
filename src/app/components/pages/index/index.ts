import { Component } from '@angular/core';
import { CGraphic } from '../../ui/c-graphic/c-graphic';

@Component({
  selector: 'app-index',
  imports: [CGraphic],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class Index {
  availability = 1;
  totalAvailability = 43;

  availabilityArray: Array<boolean> = [];

  ngOnInit() {
    this.availabilityArray = [];

    for (let i = 0; i < this.totalAvailability; i++) {
      this.availabilityArray.push(i < this.availability);
    }
  }
}
