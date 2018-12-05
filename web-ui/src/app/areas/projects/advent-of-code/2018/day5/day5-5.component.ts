import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day5-5',
  templateUrl: './day5-5.component.html'
})
export class Day5_5_2018Component implements OnInit {
  public inputString: string;
  public answer: number;

  private _inputStringCopy: string;
  private _currentRemovalCount: number;
  private _shortestLength: number;

  constructor() { }

  ngOnInit() {
  };

  public calculate(): void {
    this._inputStringCopy = this.inputString;
    this._shortestLength = Number.MAX_VALUE;

    for (let i = 65; i < 91; i++) {
      this.inputString = (' ' + this._inputStringCopy).slice(1);
      this.removePolymer(i);
      this._currentRemovalCount = 1;


      while (this._currentRemovalCount > 0) {
        this.iterateRemoval(); 
      }

      if (this.inputString.length < this._shortestLength) {
        this._shortestLength = this.inputString.length;  
      }  
    }

    this.answer = this._shortestLength;
  }

  private removePolymer(code: number) {
    this.inputString = this.inputString.replace(new RegExp(String.fromCharCode(code), 'g'), "");
    this.inputString = this.inputString.replace(new RegExp(String.fromCharCode(code + 32), 'g'), "");
  }

  private iterateRemoval() {
    this._currentRemovalCount = 0;
    const temp = this.inputString.split("");

    let inputArray = temp;

    for (let i = 0; i < inputArray.length - 1; i++) {
      if (inputArray[i].charCodeAt(0) === inputArray[i + 1].charCodeAt(0) + 32 ||
        inputArray[i].charCodeAt(0) === inputArray[i + 1].charCodeAt(0) - 32) {
        temp.splice(i, 2);
        this._currentRemovalCount += 2;
      }
    }

    this.inputString = temp.join("");
  }
}