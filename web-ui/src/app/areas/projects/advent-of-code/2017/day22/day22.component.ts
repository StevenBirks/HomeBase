import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day22',
  templateUrl: './day22.component.html'
})

export class Day22Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;

  private _grid: string[][];
  private _position: iPosition;
  private _direction: direction;
  private _infectedCount: number;
  
  ngOnInit() {
  }
  

  public calculate(): void {
    const rowsString = this.inputString.split("\n");
    this._grid = new Array<Array<string>>();

    for (let i = 0; i < 1001; i++) {
      let newRow = new Array<string>();
      for (let j = 0; j < 1001; j++) {
        newRow.push(".");
      }

      this._grid.push(newRow);
    }

    let tempGrid = new Array<Array<string>>();

    for (const row of rowsString) {
      tempGrid.push(row.split(""));
    }

    for (let j = 0; j < rowsString.length; j++) {
      for (let i = 0; i < rowsString.length; i++) {
        this._grid[(j + (this._grid[0].length +1)/2) - ((rowsString.length - 1)/2) -1][(i + (this._grid[0].length +1)/2) - ((rowsString.length - 1)/2) - 1] = tempGrid[j][i];
      }
    }

    this._direction = direction.up;
    this._infectedCount = 0;

    this._position = <iPosition> {
      x: (this._grid[0].length -1)/2,
      y: (this._grid[0].length -1)/2
    }
    
    for (let i = 0; i < 10000; i++) {
      this._burst();
    }
    
    this.answer = this._infectedCount;
  } 

  private _burst(): void {
    if (this._grid[this._position.y][this._position.x] === '#') {
      this._turnRight();
      this._grid[this._position.y][this._position.x] = '.';
    } else {
      this._turnLeft();
      this._grid[this._position.y][this._position.x] = '#';
      this._infectedCount++;
    }

    this._moveForward();
  }

  private _turnRight(): void {
    if (this._direction === direction.up) {
      this._direction = direction.right;
    } else if (this._direction === direction.right) {
      this._direction = direction.down;
    } else if (this._direction === direction.down) {
      this._direction = direction.left;
    } else if (this._direction === direction.left) {
      this._direction = direction.up;
    }
  }

  private _turnLeft(): void {
    if (this._direction === direction.up) {
      this._direction = direction.left;
    } else if (this._direction === direction.right) {
      this._direction = direction.up;
    } else if (this._direction === direction.down) {
      this._direction = direction.right;
    } else if (this._direction === direction.left) {
      this._direction = direction.down;
    }
  }

  private _moveForward(): void {
    if (this._direction === direction.up) {
      this._position.y--;
    } else if (this._direction === direction.right) {
      this._position.x++;
    } else if (this._direction === direction.down) {
      this._position.y++;
    } else if (this._direction === direction.left) {
      this._position.x--;
    }
  }

}

interface iPosition {
  x: number,
  y: number
}

enum direction {
  up,
  down,
  left,
  right
}
