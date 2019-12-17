import { Component } from '@angular/core';

@Component({
  selector: 'app-2019-day16-5',
  templateUrl: './day16-5.component.html'
})
export class Day16_5_2019Component {

  constructor() { }

  public inputString: string;
  public answer: number;

  private _values: number[];



  public calculate(): void {
    this.init();

    const initialOffset = Number.parseInt(this.inputString.slice(0, 7));
    this._values = this._values.slice(initialOffset);

    for (let iteration = 0; iteration < 100; iteration++) {
      for (let i = this._values.length - 1; i >= 0; i--) {
        const value = (this._values[i + 1] || 0) + this._values[i];
        this._values[i] = Math.abs(value) % 10;
      }
    }

    this.answer = Number.parseInt(this._values.slice(0, 8).join(""));
  }

  private init() {
    this._values = new Array<number>();

    for (let i = 0; i < 10000; i++) {
      this.inputString.split("").forEach((value) => {
        this._values.push(Number.parseInt(value));
      })
    }
  }
}

