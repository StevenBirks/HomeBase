import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day12',
  templateUrl: './day12.component.html'
})
export class Day12_2015Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number;

  private _inputArray: string[];

  ngOnInit() {
  }

  public calculate(): void {
    this._inputArray = new Array<string>();

    this.inputString.split("").forEach((input) => {
      if (isNaN(Number.parseInt(input)) && input !== '-' && input !== ',') { }
      else {
        this._inputArray.push(input);
      }
    });

    this.inputString = this._inputArray.join("");

    let numberArray = new Array<number>();

    this.inputString.split(",").forEach((input) => {
      let result = Number.parseInt(input);
      if (!isNaN(result)) {
        numberArray.push(result);
      }
    });

    this.answer = 0;

    numberArray.forEach((value) => {
      this.answer += value;
    })
  }
}
