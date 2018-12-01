import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day1',
  templateUrl: './day1.component.html'
})
export class Day1_2018Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number

  private _inputArray: string[];
  
  ngOnInit() {
    this.answer = 0;
  }

  public calculate(): void {
    this._inputArray = new Array<string>();
    this._inputArray = this.inputString.split("\n");

    this._inputArray.forEach((value) => {
      this.answer += Number.parseInt(value);
    });
  }
}
