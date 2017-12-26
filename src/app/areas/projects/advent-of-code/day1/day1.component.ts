import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day1',
  templateUrl: './day1.component.html'
})
export class Day1Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number;

  private inputArray: number[];
  
  ngOnInit() {
  }

  public calculate(): void {
    this.inputArray = new Array<number>();
    this.answer = 0;

    const length = this.inputString.length

    for (let i = 0; i < length; i++)
    {
      let newVal = Number.parseInt(this.inputString.charAt(i));
      this.inputArray.push(newVal);
    }

    for (let i = 0; i < length - 1; i++)
    {
      if (this.inputArray[i] === this.inputArray[i+1]) {
        this.answer += this.inputArray[i];
      }      
    }

    if (this.inputArray[length -1] === this.inputArray[0]) {
      this.answer += this.inputArray[length -1]
    }
  }
}
