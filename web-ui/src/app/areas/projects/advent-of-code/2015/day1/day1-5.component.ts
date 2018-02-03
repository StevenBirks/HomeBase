import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day1-5',
  templateUrl: './day1-5.component.html'
})
export class Day1_5_2015Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number;

  private _inputArray: string[];

  private _floor: number;
  
  ngOnInit() {
  }

  public calculate(): void {
    this._inputArray = new Array<string>();
    this._inputArray = this.inputString.split("");

    this._floor = 0;
    this.answer = 0;

    for (let i = 0; i < this._inputArray.length; i++) {

      if (this._inputArray[i] === "(") {
        this._floor++;
      } else {
        this._floor--;
      }

      if (this._floor === -1 && this.answer === 0) {
        this.answer = i + 1;
      }
    }
  }
}
