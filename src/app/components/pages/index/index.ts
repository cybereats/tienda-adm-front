import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  imports: [],
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
