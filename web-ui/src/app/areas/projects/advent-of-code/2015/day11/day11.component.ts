import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day11',
  templateUrl: './day11.component.html'
})
export class Day11_2015Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: string;

  private _password: string[];
  private _complies: boolean;

  ngOnInit() {
  }

  public calculate(): void {
    this._password = new Array<string>();
    this._complies = false;

    this.inputString.split("").forEach((input) => {
      this._password.push(input);
    });

    while (!this._complies) {
      this.incrementPassword();
      console.log(this._password);
      
      this.checkCompliance();
    }

    this.answer = this._password.join("");
  }

  private incrementPassword() {
    let incremented = false;
    let incrementCharIndex = this._password.length - 1;

    while (!incremented) {
      if (this._password[incrementCharIndex].charCodeAt(0) !== 122) {
        this._password[incrementCharIndex] = String.fromCharCode(this._password[incrementCharIndex].charCodeAt(0) + 1);
        incremented = true;
      } else {
        this._password[incrementCharIndex] = String.fromCharCode(97)
        incrementCharIndex--;
      }
    }

  }

  private checkCompliance() {
    this._complies = this.checkSequence() && this.checkValidChars() && this.checkPairs();
  }

  private checkSequence(): boolean {
    for (let i = 0; i < this._password.length - 2; i++) {
      if (this._password[i + 1].charCodeAt(0) === this._password[i].charCodeAt(0) + 1 &&
        this._password[i + 2].charCodeAt(0) === this._password[i].charCodeAt(0) + 2) {
        return true;
      }
    }

    return false;
  }

  private checkValidChars(): boolean {
    for (let i = 0; i < this._password.length; i++) {
      if (this._password[i] === 'i' || this._password[i] === 'o' || this._password[i] === 'l') {
        return false;
      }
    }

    return true;
  }

  private checkPairs(): boolean {
    let pairCount = 0;

    for (let i = 0; i < this._password.length - 1; i++) {
      if (this._password[i] === this._password[i+1]) {
        pairCount++;
        i++;
      }
    }

    return pairCount >= 2;
  }
}
