import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day14-5',
  templateUrl: './day14-5.component.html'
})
export class Day14_5_2018Component implements OnInit {

  constructor() { }

  public inputNumber: number;
  public answer: number;

  private _recipes: number[];
  private _elves: number[];
  private _iteration: number;
  private _inputLength: number;

  private _inputDetected: boolean;

  ngOnInit() {
  }

  public calculate(): void {
    this.init();

    this.iterateRecipes();

    this.answer = this._recipes.length - this.inputNumber.toString().length;
  }

  private iterateRecipes() {
    this._iteration++;
    this.createNewRecipes();
    this.moveElves();

    if (!this._inputDetected) {
      if (this._iteration % 5000 === 0) {
        let timeout = 1;

        window.setTimeout(() => {
          this.answer = this._recipes.length - this._inputLength;
          this.iterateRecipes();
        }, timeout);
      } else {
        this.iterateRecipes();
      }
    } else {
      this.answer = this._recipes.length - this._inputLength;
    }
  }

  private detectInput() {
    const inputStringLength = this._inputLength
    if (this._recipes.length >= inputStringLength) {
      const comp = this._recipes.slice(this._recipes.length - inputStringLength);
      if (Number.parseInt(comp.join(""), 10) === this.inputNumber) {
        this._inputDetected = true;
      }
    }
  }

  private createNewRecipes() {
    const newRecipeSum = this._recipes[this._elves[0]] + this._recipes[this._elves[1]];

    newRecipeSum.toString().split("").forEach((value) => {
      if (!this._inputDetected) {
        const newRecipeValue = Number.parseInt(value, 10);
        this._recipes.push(newRecipeValue);
        this.detectInput();
      }
    });
  }

  private moveElves() {
    for (let i = 0; i < 2; i++) {
      let index = this._elves[i] + this._recipes[this._elves[i]] + 1;

      while ((this._recipes.length - 1) < index) {
        index = index - this._recipes.length;
      }

      this._elves[i] = index;
    }
  }

  private init() {
    this._inputLength = this.inputNumber.toString().length;
    this._iteration = 0;
    this._recipes = new Array<number>();
    this._recipes.push(3);
    this._recipes.push(7);

    this._elves = new Array<number>();
    this._elves.push(0);
    this._elves.push(1);
  }
}