import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day5-5',
  templateUrl: './day5-5.component.html'
})
export class Day5_5Component implements OnInit {

  constructor() { }
  
  public inputString: string;
  public answer: number;

  private inputArray: number[];
  
  ngOnInit() {
  }

  public calculate(): void {
    this.inputArray = new Array<number>();
    this.answer = 0;
    
    for (const inputArrayString of this.inputString.split("\n")) {
      this.inputArray.push(Number.parseInt(inputArrayString));
    }

    let position = 0;
    let stepCount = 0;

    while (position >=0 && position < this.inputArray.length)
    {
      if (this.inputArray[position] >= 3) {
        this.inputArray[position]--;
        position = position + this.inputArray[position] + 1;      
      } else {        
        this.inputArray[position]++;
        position = position + this.inputArray[position] - 1;      
      }
      
      stepCount++;      
    }

    this.answer = stepCount;
  }
}