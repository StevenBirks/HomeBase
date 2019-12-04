import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2019-day4-5',
  templateUrl: './day4-5.component.html'
})
export class Day4_5_2019Component implements OnInit {
  public inputString: string;
  public answer: number;

  private _max: number;
  private _min: number;

  private _goodPasswords: number[];

  constructor() { }

  ngOnInit() {
  };

  public calculate(): void {
    this._min = Number.parseInt(this.inputString.split("-")[0]);
    this._max = Number.parseInt(this.inputString.split("-")[1]);

    this._goodPasswords = new Array<number>();

    for (let i = this._min; i <= this._max; i++) {
      if (this.hasTwoAdjacentDigits(i) &&
        this.digitsNeverDecrease(i)) {
        this._goodPasswords.push(i);
      }
    }

    this.answer = this._goodPasswords.length;
  }

  private hasTwoAdjacentDigits(password: number): boolean {
    const pw = password.toString().split('');

    if (pw[0] == pw[1] && pw[1] != pw[2]) {
      return true;
    }

    if (pw[4] == pw[5] && pw[4] != pw[3]) {
      return true;
    }

    for (let i = 1; i < 4; i++) {
      if (pw[i] == pw[i + 1] &&
        pw[i - 1] != pw[i] &&
        pw[i + 1] != pw[i + 2]) {
        return true;
      }
    }

    return false;
  }

  private digitsNeverDecrease(password: number): boolean {
    const pw = password.toString().split('');
    for (let i = 0; i < 5; i++) {
      if (pw[i] > pw[i + 1]) {
        return false;
      }
    }

    return true;
  }
}
