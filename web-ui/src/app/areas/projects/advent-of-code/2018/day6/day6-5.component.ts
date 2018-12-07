import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day6-5',
  templateUrl: './day6-5.component.html'
})
export class Day6_5_2018Component implements OnInit {
  public inputString: string;
  public answer: number;

  private _coordinates: iCoordinate[];
  private _locationArray: number[][];

  constructor() { }

  ngOnInit() {
  };

  public calculate(): void {
    this._coordinates = new Array<iCoordinate>();
    this._locationArray = new Array<Array<number>>();

    var ref = 0;

    this.inputString.split("\n").forEach((row) => {

      this._coordinates.push(<iCoordinate>{
        ref: ref,
        x: Number.parseInt(row.split(",")[0], 10),
        y: Number.parseInt(row.split(",")[1], 10)
      });

      ref++;
    });

    this.initialiseCoordinateArray();


    for (let i = 0; i < 500; i++) {
      for (let j = 0; j < 500; j++) {
        this.isCoordinateValid(i, j);
      }
    }

    this.answer = this.countZeros();
  }

  private initialiseCoordinateArray() {
    for (let i = 0; i < 500; i++) {
        this._locationArray[i] = new Array<number>();
        for (let j = 0; j < 500; j++) {
          this._locationArray[i][j] = -1;
        }
    }
  }

  private isCoordinateValid(x: number, y: number) {
    var totalDistance = 0;
    for (let i = 0; i < this._coordinates.length; i++) {
      const locX = Math.abs(this._coordinates[i].x - x);
      const locY = Math.abs(this._coordinates[i].y - y);

      totalDistance += locX + locY;
    }

    if (totalDistance < 10000) {
      this._locationArray[y][x] = 0;
    }
  }

  private countZeros(): number {
    var count = 0;
    for (let i = 0; i < 500; i++) {
      for (let j = 0; j < 500; j++) {
        if (this._locationArray[i][j] === 0) {
          count++;
        }
      }
    }

    return count;
  }
}

interface iCoordinate {
  x: number,
  y: number,
  ref: number
}