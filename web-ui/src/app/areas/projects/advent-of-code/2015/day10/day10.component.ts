import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day10',
  templateUrl: './day10.component.html'
})
export class Day10_2015Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: string;

  private _digitArray: number[];

  ngOnInit() {
  }

  public calculate(): void {
    this._digitArray = new Array<number>();

    this.inputString.split("").forEach((input) => {
      this._digitArray.push(Number.parseInt(input));
    });

    for (let i = 0; i < 40; i++) {
      this.process();
    }

    this.answer = this._digitArray.length.toString();
  }

  private process() {
    let tempdigitArray = new Array<number>();
    for (let j = 0; j < this._digitArray.length; j++) {
      let currentCount = 1;

      if (j == this._digitArray.length - 1) {
        tempdigitArray.push(currentCount);
        tempdigitArray.push(this._digitArray[j]);
      } else {
        while (this._digitArray[j + 1] === this._digitArray[j]) {
          j++;
          currentCount++
          if (j + 1 == this._digitArray.length - 1) {
            break;
          }
        }

        tempdigitArray.push(currentCount);
        tempdigitArray.push(this._digitArray[j]);
      }
    }

    this._digitArray = tempdigitArray;
  }
}
