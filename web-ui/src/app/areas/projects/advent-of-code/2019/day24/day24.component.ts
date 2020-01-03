import { Component } from '@angular/core';


@Component({
  selector: 'app-2019-day24',
  templateUrl: './day24.component.html'
})
export class Day24_2019Component {
  constructor() { }

  public inputString: string;
  public answer: number;

  private _grid: string[][];
  private _scores: Set<number>;
  private _iterations: number;

  public calculate(): void {
    this.init();

    this.iterate();
  }

  private init() {
    this._grid = new Array<Array<string>>();
    this._scores = new Set<number>();
    this._iterations = 0;

    this.inputString.split('\n').forEach((value) => {
      const newRow = new Array<string>();

      value.split('').forEach((val) => {
        newRow.push(val);
      });

      this._grid.push(newRow);
    });
  }

  private iterate() {
    const tempGrid = JSON.parse(JSON.stringify(this._grid));
    this._iterations++;

    for (let y = 0; y < this._grid.length; y++) {
      for (let x = 0; x < this._grid[0].length; x++) {
        let count = 0;

        if (x !== 0) {
          if (this._grid[y][x - 1] === '#') {
            count++;
          }
        }

        if (x !== this._grid[0].length - 1) {
          if (this._grid[y][x + 1] === '#') {
            count++;
          }
        }

        if (y !== 0) {
          if (this._grid[y - 1][x] === '#') {
            count++;
          }
        }

        if (y !== this._grid.length - 1) {
          if (this._grid[y + 1][x] === '#') {
            count++;
          }
        }

        if (this._grid[y][x] === '#' && count !== 1) {
          tempGrid[y][x] = '.';
        }

        if (this._grid[y][x] === '.' && (count === 1 || count === 2)) {
          tempGrid[y][x] = '#';
        }
      }
    }

    this._grid = tempGrid;

    const score = this.calculateScore();

    if (this._scores.has(score)) {
      this.answer = score;
    } else {
      this._scores.add(score);
      this.iterate();
    }
  }

  private calculateScore(): number {
    let score = 0;

    for (let y = 0; y < this._grid.length; y++) {
      for (let x = 0; x < this._grid[0].length; x++) {
        if (this._grid[y][x] === '#') {
          score += Math.pow(2, ((5 * y) + x));
        }
      }
    }

    return score;
  }
}
