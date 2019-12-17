import { Component } from '@angular/core';


@Component({
  selector: 'app-2019-day16',
  templateUrl: './day16.component.html'
})
export class Day16_2019Component {

  constructor() { }

  public inputString: string;
  public answer: number;

  private _values: number[];
  private _multipliers: number[][];

  public calculate(): void {
    this.init();

    this.iterateValues(0);
  }

  private init() {
    this._values = new Array<number>();
    
    this.inputString.split("").forEach((value) => {
      this._values.push(Number.parseInt(value));
    })

    this.setMultipliers();
  }

  private iterateValues(iteration: number) {
    let newValues = new Array<number>();

    for (let i = 0; i < this._values.length; i++) {
      let newValue = 0;
      const indexMultipliers = this._multipliers[i];

      for (let j = 0; j < this._values.length; j++) {
        newValue += (this._values[j] * indexMultipliers[j]);
      }

      newValues.push(Math.abs(newValue % 10));
    }

    this._values = newValues;

    if (iteration < 99) {
      window.setTimeout(() => {
        console.log(iteration + 1);
        this.iterateValues(iteration + 1);
      }, 1)
    } else {
      this.answer = Number.parseInt(this._values.slice(0,8).join(""));
    }
  }

  private setMultipliers() {
    this._multipliers = new Array<Array<number>>();

    for (let k = 0; k < this._values.length; k++) {
      let multipliers = new Array<number>();

      const values = [0, 1, 0, -1];
      for (let i = 0; i < this._values.length + 1; i++) {
        for (let j = 0; j < k + 1; j++) {
          multipliers.push(values[i % 4]);
        }
      }
  
      multipliers = multipliers.slice(1, this._values.length + 1);
  
      this._multipliers.push(multipliers);
    }
  }
}