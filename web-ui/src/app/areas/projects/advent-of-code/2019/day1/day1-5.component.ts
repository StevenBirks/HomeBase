import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2019-day1-5',
  templateUrl: './day1-5.component.html'
})
export class Day1_5_2019Component implements OnInit {
  constructor() { }

  public inputString: string;
  public answer: number;
  private _inputArray: number[];
  
  ngOnInit() {
  }

  public calculate(): void {
    this.answer = 0;
    this._inputArray = new Array<number>();
    this.inputString.split("\n").forEach((value) => {
      this._inputArray.push(Number.parseInt(value));
    });

    this._inputArray.forEach((value) => {
      let fuel = this.calculateFuelForValue(value);
      let previouslyAddedFuel = fuel;
      while (previouslyAddedFuel > 0) {
        const moreFuel = this.calculateFuelForValue(previouslyAddedFuel);

        if (moreFuel > 0) {
          fuel += moreFuel;
        }

        previouslyAddedFuel = moreFuel;
      }

      this.answer += fuel;
    });
  }

  private calculateFuelForValue(mass: number):number {
    let fuel = mass / 3;
    fuel = Number.parseInt(fuel.toString());
    fuel -= 2;

    return fuel;
  }
}
