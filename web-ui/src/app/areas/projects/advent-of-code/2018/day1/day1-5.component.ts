import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day1-5',
  templateUrl: './day1-5.component.html'
})
export class Day1_5_2018Component implements OnInit {


  constructor() { }

  public inputString: string;
  public answer: number;
  public frequency: number;

  private _inputArray: string[];
  private _foundFrequencies: number[];

  ngOnInit() {
    this.frequency = 0;
    this.answer = null;
    this._foundFrequencies = new Array<number>();
  }

  public calculate(): void {
    this._inputArray = new Array<string>();
    this._inputArray = this.inputString.split("\n");
    this.answer == null;

    while (this.answer === null) {
      this.iterateList();
    }
  }

  private iterateList() {
    for (let i = 0; i < this._inputArray.length; i++) {
      var newFreq = Number.parseInt(this._inputArray[i], 10);
      this.frequency += newFreq;
      if (this._foundFrequencies.indexOf(this.frequency) !== -1) {
        this.answer = this.frequency;
        break;
      } else {
        this._foundFrequencies.push(this.frequency);
      }
    }
  }
}
