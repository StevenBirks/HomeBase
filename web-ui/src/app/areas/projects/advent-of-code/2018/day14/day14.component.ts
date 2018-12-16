import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-2018-day14',
  templateUrl: './day14.component.html'
})
export class Day14_2018Component implements OnInit {

  constructor() { }

  public inputNumber: number;
  public answer: string;

  private _recipes: number[];
  private _elves: number[]

  ngOnInit() {
    this.inputNumber = 704321;
  }

  public calculate(): void {
    this.init();

    while(this._recipes.length < this.inputNumber + 10) {
      this.iterateRecipes();
    }

    this.answer = this._recipes.join("").slice(this.inputNumber);
  }

  private iterateRecipes() {
    this.createNewRecipes();
    this.moveElves();
  }

  private createNewRecipes() {
    const newRecipeSum = this._recipes[this._elves[0]] + this._recipes[this._elves[1]];

    newRecipeSum.toString().split("").forEach((value) => {
      const newRecipeValue = Number.parseInt(value, 10);
      this._recipes.push(newRecipeValue);
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
    this._recipes = new Array<number>();
    this._recipes.push(3);
    this._recipes.push(7);

    this._elves = new Array<number>();
    this._elves.push(0);
    this._elves.push(1);
  }
}