import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2019-day1',
  templateUrl: './day1.component.html'
})
export class Day1_2019Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number
  private _inputArray: number[];
  
  ngOnInit() {
  }

  public calculate(): void {
    this.answer = 0;
    this._inputArray = new Array<number>();
    this.inputString.split("\n").forEach((value) => {
      this._inputArray.push(Number.parseInt(value));
    });

    this._inputArray.forEach((value) => {
      let result = value / 3;
      result = Number.parseInt(result.toString());
      result -= 2;
      this.answer += result;
    });
  }
}
