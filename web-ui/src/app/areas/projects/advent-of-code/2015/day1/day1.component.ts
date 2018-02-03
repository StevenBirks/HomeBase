import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day1',
  templateUrl: './day1.component.html'
})
export class Day1_2015Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number;

  private _inputArray: string[];
  
  ngOnInit() {
  }

  public calculate(): void {
    this._inputArray = new Array<string>();
    this._inputArray = this.inputString.split("");

    this.answer = this._inputArray.length - (2*this._inputArray.filter((value) => {
      return value === ")";
    }).length);
  }
}
