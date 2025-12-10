import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class Index {
  availability = 18;
  totalAvailability = 30;

  availabilityArray: Array<boolean> = [];

  ngOnInit() {
    this.availabilityArray = [];

    for (let i = 0; i < this.totalAvailability; i++) {
      this.availabilityArray.push(i < this.availability);
    }
  }
}
