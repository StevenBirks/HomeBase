import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day6',
  templateUrl: './day6.component.html'
})
export class Day6_2018Component implements OnInit {
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
        this.findClosestCoordinate(i, j);
      }
    }

    var nonInfiniteCoordinates = this.findNonInfiniteCoordinates();

    this.answer = this.findLargestArea(nonInfiniteCoordinates);
  }

  private initialiseCoordinateArray() {
    for (let i = 0; i < 500; i++) {
        this._locationArray[i] = new Array<number>();
        for (let j = 0; j < 500; j++) {
          this._locationArray[i][j] = -1;
        }
    }
  }

  private findClosestCoordinate(x: number, y: number) {
    var closestDistance = 1000;
    var closestCoordinates = new Array<number>();
    for (let i = 0; i < this._coordinates.length; i++) {
      const locX = Math.abs(this._coordinates[i].x - x);
      const locY = Math.abs(this._coordinates[i].y - y);

      if (locX + locY < closestDistance) {
        closestDistance = locX + locY;
        closestCoordinates = new Array<number>();
        closestCoordinates.push(this._coordinates[i].ref);
      } else if (locX + locY === closestDistance) {
        closestCoordinates.push(this._coordinates[i].ref)
      }
    }

    if (closestCoordinates.length === 1) {
      this._locationArray[y][x] = closestCoordinates[0];
    }
  }

  private findNonInfiniteCoordinates(): number[] {
    var coordinateRefs = new Array<number>();
    this._coordinates.forEach((coordinate) => {
      coordinateRefs.push(coordinate.ref);
    })

    for (let i = 0; i < 500; i++) {
      var index = coordinateRefs.indexOf(this._locationArray[0][i]);

      if (index > -1) {
        coordinateRefs.splice(index, 1);
      }
    }

    for (let i = 0; i < 500; i++) {
      var index = coordinateRefs.indexOf(this._locationArray[499][i]);

      if (index > -1) {
        coordinateRefs.splice(index, 1);
      }
    }

    for (let i = 0; i < 500; i++) {
      var index = coordinateRefs.indexOf(this._locationArray[i][0]);

      if (index > -1) {
        coordinateRefs.splice(index, 1);
      }

      var index = coordinateRefs.indexOf(this._locationArray[i][499]);

      if (index > -1) {
        coordinateRefs.splice(index, 1);
      }
    }

    return coordinateRefs;
  }

  private findLargestArea(nonInfiniteCoordinates: number[]): number {
    var largestArea = 0;

    nonInfiniteCoordinates.forEach((coordinate) => {
      var coordCount = 0;
      for (let i = 0; i < 500; i++) {
        for(let j = 0; j < 500; j++) {
          if (this._locationArray[i][j] === coordinate) {
            coordCount++;
          }
        }
      }

      if (coordCount > largestArea) {
        largestArea = coordCount;
      }
    })

    return largestArea;
  }
}

interface iCoordinate {
  x: number,
  y: number,
  ref: number
}