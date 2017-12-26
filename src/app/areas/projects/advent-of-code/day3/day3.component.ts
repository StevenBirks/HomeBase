import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day3',
  templateUrl: './day3.component.html'
})
export class Day3Component implements OnInit {

  constructor() { }
  public input: number;
  public answer: string;
  
  ngOnInit() {
  }

  public calculate(): void {
    let x = 0;
    let y = 0;
    
    let intervalSize = 1;
    let intervalIncrement = 1;
    let intervalCount = 1;

    for (let step = 1; step < this.input; step++) {
      if (intervalCount % 4 == 1) {
        x++;
      } else if (intervalCount % 4 == 2) {
        y++
      } else if (intervalCount % 4 == 3) {
        x--;
      } else {
        y--;
      }      

      intervalIncrement++;
      if (intervalIncrement > intervalSize) {
        intervalIncrement = 1;
        intervalCount++;
        if (intervalCount % 2 == 1) {
          intervalSize++
        }
      }
    }

    this.answer = `x:${x}, y:${y}, total: ${Math.abs(x) + Math.abs(y)}`;
  }
}