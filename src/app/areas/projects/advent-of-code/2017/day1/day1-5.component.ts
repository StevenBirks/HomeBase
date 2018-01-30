import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day1-5',
  templateUrl: './day1-5.component.html'
})
export class Day1_5Component implements OnInit {

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

    for (let i = 0; i < length; i++)
    {
      const index = i >= length / 2
        ? i - (length / 2)
        : (length / 2) + i;

      if (this.inputArray[i] === this.inputArray[index]) {
        this.answer += this.inputArray[i];
      }      
    }
  }
}