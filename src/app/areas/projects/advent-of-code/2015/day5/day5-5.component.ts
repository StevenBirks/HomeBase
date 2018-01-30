import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day5-5',
  templateUrl: './day5-5.component.html'
})
export class Day5_5_2015Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;

  private _niceCount: number;

  ngOnInit() {
  }

  public calculate(): void {
    this._niceCount = 0;
    var inputRows = this.inputString.split("\n");

    inputRows.forEach((row) => {
      let rowArray = row.split("");
      if (this._repeatCheck(rowArray) &&
        this._letterCheck(rowArray)) {
          console.log(rowArray);
        this._niceCount++
      }
    });

    this.answer = this._niceCount;
  }

  private _repeatCheck(row: string[]): boolean {
    for (let j = 0; j < row.length - 2; j++) {
      for (let k = j+2; k < row.length - 1; k++) {
        if (row[j] === row[k] && row[j+1] === row[k+1]) {
          return true;
        }
      }
    }

    return false;
  }

  private _letterCheck(row: string[]): boolean {

    for (let j = 0; j < row.length - 2; j++) {
      if (row[j] === row[j + 2]) {
        return true;
      }
    }

    return false;
  }
}
