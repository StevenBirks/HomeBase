import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day2',
  templateUrl: './day2.component.html'
})
export class Day2_2018Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number

  private _inputArray: string[];
  private _count2: number;
  private _count3: number;

  ngOnInit() {
    this._count2 = 0;
    this._count3 = 0;
  }

  public calculate(): void {
    this._inputArray = new Array<string>();
    this._inputArray = this.inputString.split("\n");

    this._inputArray.forEach((value) => {
      const valueArray = value.split("");
      let flag_2 = false;
      let flag_3 = false;
      for (let i = 0; i < valueArray.length; i++) {
        if (!flag_2) {
          flag_2 = this.CheckCountOfLetter(valueArray[i], valueArray, 2);
        }

        if (!flag_3) {
          flag_3 = this.CheckCountOfLetter(valueArray[i], valueArray, 3);
        }
      }

      if (flag_2) {
        this._count2++;
      }

      if (flag_3) {
        this._count3++;
      }
    });

    this.answer = this._count2 * this._count3;
  }

  private CheckCountOfLetter(letter: string, codeArray: string[], count: number): boolean {
    let foundCount = 0;

    for (let i = 0; i < codeArray.length; i++) {
      if (letter === codeArray[i]) {
        foundCount++;
      }
    }

    return foundCount === count;
  }
}
