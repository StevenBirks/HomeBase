import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day5',
  templateUrl: './day5.component.html'
})
export class Day5_2015Component implements OnInit {

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
      if (this._vowelCheck(row) &&
        this._letterCheck(row) &&
        this._stringCheck(row)) {
        this._niceCount++
      }
    });

    this.answer = this._niceCount;
  }

  private _vowelCheck(row: string): boolean {
    let rowArray = row.split("");

    if (rowArray.filter((letter) => {
      return letter === 'a' ||
        letter === 'e' ||
        letter === 'i' ||
        letter === 'o' ||
        letter === 'u';
    }).length > 2) {
      return true;
    } else {
      return false;
    }
  }

  private _letterCheck(row: string): boolean {
    let rowArray = row.split("");

    for (let j = 0; j < rowArray.length - 1; j++) {
      if (rowArray[j] === rowArray[j+1]) {
        return true;
      }
    }

    return false;
  }

  private _stringCheck(row: string): boolean {
    if (row.indexOf('ab') === -1 &&
      row.indexOf('cd') === -1 &&
      row.indexOf('pq') === -1 &&
      row.indexOf('xy') === -1) {
      return true;
    } else {
      return false;
    }
  }
}
