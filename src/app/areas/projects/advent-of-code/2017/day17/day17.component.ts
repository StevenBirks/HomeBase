import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day17',
  templateUrl: './day17.component.html'})
export class Day17Component implements OnInit {

  constructor() { }
  
  public inputNumber: number;
  public answer: number;

  private _vortexArray: number[];
  private _position: number;
  ngOnInit() {
  }

  public calculate(): void {
    this.answer = 0;
    this._vortexArray = new Array<number>();
    this._vortexArray.push(0);
    this._position = 0;

    for (let i = 1; i < 2018; i++) {
      // step
      this._position += this.inputNumber;
      while (this._position >= this._vortexArray.length) {
        this._position -= this._vortexArray.length;
      }

      // insert
      let tempArray = this._vortexArray.slice(0,this._position + 1);
      tempArray.push(i);
      tempArray = tempArray.concat(this._vortexArray.slice(this._position+1));
      this._vortexArray = tempArray;

      // step
      this._position++;
    }
    
    this.answer = this._vortexArray[this._position + 1];
  }
}
