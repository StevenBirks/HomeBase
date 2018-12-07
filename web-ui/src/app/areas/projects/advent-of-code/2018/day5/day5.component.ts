import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day5',
  templateUrl: './day5.component.html'
})
export class Day5_2018Component implements OnInit {
  public inputString: string;
  public answer: number;

  private _currentRemovalCount: number;

  constructor() { }

  ngOnInit() {
  };

  public calculate(): void {

    this._currentRemovalCount = 1;

    while (this._currentRemovalCount > 0) {
      this.iterateRemoval();
      this.answer = this.inputString.length;
    }
  }

  private iterateRemoval() {
    this._currentRemovalCount = 0;
    const temp = this.inputString.split("");

    let inputArray = temp;

    for (let i = 0; i < inputArray.length - 1; i++) {
      if (inputArray[i].charCodeAt(0) === inputArray[i+1].charCodeAt(0) + 32 ||
      inputArray[i].charCodeAt(0) === inputArray[i+1].charCodeAt(0) - 32) {
        temp.splice(i, 2);
        this._currentRemovalCount +=2;
      }
    }

    this.inputString = temp.join("");
  }
}