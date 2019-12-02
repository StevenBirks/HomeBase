import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2019-day2',
  templateUrl: './day2.component.html'
})
export class Day2_2019Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number

  private _values: number[];
  private _position: number;

  ngOnInit() {
  }

  public calculate(): void {
    this._values = new Array<number>();
    this.inputString.split(",").forEach((value) => {
      this._values.push(Number.parseInt(value));
    });

    this._values[1] = 12;
    this._values[2] = 2;

    this._position = 0;

    while (this._values[this._position] !== 99) {      
      this.calculateNext();

      this._position += 4;
    }  

    this.answer = this._values[0];
  }

  private calculateNext() {
    if (this._values[this._position] === 1) {
      this._values[this._values[this._position + 3]] = this._values[this._values[this._position + 1]] + this._values[this._values[this._position + 2]];
    } else if (this._values[this._position] === 2) {
      this._values[this._values[this._position + 3]] = this._values[this._values[this._position + 1]] * this._values[this._values[this._position + 2]];
    } else {
      console.log(this._values[this._position]);
      this._values[this._position + 4] = 99;
    }
  }
}
