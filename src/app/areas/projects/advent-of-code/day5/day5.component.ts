import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day5',
  templateUrl: './day5.component.html'
})
export class Day5Component implements OnInit {

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
      this.inputArray[position]++;
      position = position + this.inputArray[position] - 1;      
      stepCount++;      
    }

    this.answer = stepCount;
  }
}