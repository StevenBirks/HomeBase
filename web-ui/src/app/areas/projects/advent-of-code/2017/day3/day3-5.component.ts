import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day3-5',
  templateUrl: './day3-5.component.html'
})
export class Day3_5Component implements OnInit {

  constructor() { }
  public input: number;
  public answer: string;

  private _matrix: number[][];
  
  ngOnInit() {
  }

  public calculate(): void {

    // create matrix with 0's
    this._matrix = new Array<Array<number>>();
    for(let i = 0; i < 20; i++) {
      this._matrix[i] = [];
      for(let j = 0; j < 20; j++) {
          this._matrix[i][j] = 0;
      }
    }

    // initialise starting position in matrix to 9,9
    let x = 9;
    let y = 9;

    // starting block = 1;
    this._matrix[9][9] = 1;
    
    let intervalSize = 1;
    let intervalIncrement = 1;
    let intervalCount = 1;

    while (this._matrix[x][y] < this.input) {
      if (intervalCount % 4 == 1) {
        x++;
      } else if (intervalCount % 4 == 2) {
        y++
      } else if (intervalCount % 4 == 3) {
        x--;
      } else {
        y--;
      }
      this._insertMatrixValue(x, y);  

      intervalIncrement++;
      if (intervalIncrement > intervalSize) {
        intervalIncrement = 1;
        intervalCount++;
        if (intervalCount % 2 == 1) {
          intervalSize++
        }
      }
    }

    this.answer = `x:${x}, y:${y}, total: ${this._matrix[x][y]}`;
  }

  private _insertMatrixValue(x: number, y: number): void {
    this._matrix[x][y] = 
      this._matrix[x+1][y] +
      this._matrix[x+1][y+1] +
      this._matrix[x+1][y-1] +
      this._matrix[x][y+1] +
      this._matrix[x][y-1] +
      this._matrix[x-1][y] +
      this._matrix[x-1][y+1] +
      this._matrix[x-1][y-1];  
  }
}