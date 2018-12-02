import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day2-5',
  templateUrl: './day2-5.component.html'
})
export class Day2_5_2018Component implements OnInit {
  constructor() { }

  public inputString: string;
  public answer: string

  private _inputArray: string[];

  ngOnInit() {
    this.answer = "";
  }

  public calculate(): void {
    this._inputArray = new Array<string>();
    this._inputArray = this.inputString.split("\n");

    this._inputArray.forEach((value) => {
      let result = "";
      if (this.answer.length === 0) {
        result = this.CompareValues(value);
      }

      if (result.length > 0) {
        this.answer = result;
      }
    });
  }

  private CompareValues(value: string): string {
    var valueArray = value.split("");
    let correctArray = "";

    this._inputArray.forEach((inputArrayValue) => {
      let clashCount = 0;
      let commonLetters = new Array<string>();
      const inputArrayValueArray = inputArrayValue.split("");
      for (let i = 0; i < inputArrayValueArray.length; i++) {
        if (inputArrayValueArray[i] !== valueArray[i]) {
          clashCount++;
        } else {
          commonLetters.push(valueArray[i]);
        }
      }

      if (clashCount === 1) {
        correctArray = commonLetters.join("");
      }
    });

    return correctArray;
  }


}
