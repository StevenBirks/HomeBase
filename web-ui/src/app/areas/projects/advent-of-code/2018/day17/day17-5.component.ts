import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { WaterDisplayComponent } from './water-display/water-display.component';

@Component({
  selector: 'app-2018-day17-5',
  templateUrl: './day17-5.component.html'
})
export class Day17_5_2018Component implements OnInit {
  _paused: boolean;
  _minY: number;

  constructor(public dialog: MatDialog) { }

  @ViewChild(WaterDisplayComponent) child: WaterDisplayComponent;

  public inputString: string;
  public answer: number;

  _maxY: number;
  _ground: string[][];
  _dropPoints: iLocation[];


  ngOnInit() {
  }

  public calculate(): void {
    this.init();
    this.openDialog();
  }

  private iterateWater() {
    if (this._dropPoints.length > 0) {
      // find next lowest
      let containmentCheck = true;
      let lowestY = this.findLowestPoint(this._dropPoints[0]);

      if (lowestY === null) {
        this.fillToDropPoint(this._dropPoints[0], this._maxY);
      } else {
        while (containmentCheck) {
          // find row contained
          const rowConfinedCoords = this.findRowConfinedCoords(this._dropPoints[0].x, lowestY);
          // fill row
          if (rowConfinedCoords.length == 2) {
            for (let a = rowConfinedCoords[0]; a <= rowConfinedCoords[1]; a++) {
              this._ground[lowestY][a] = "~";
            }

            lowestY--;
          } else {
            containmentCheck = false;
          }
        }
        // fil to fill point
        if (lowestY >= this._dropPoints[0].y) {
          this.fillToDropPoint(this._dropPoints[0], lowestY);
        }

        //fill overflow row;
        this.fillOverflowRow(this._dropPoints[0].x, lowestY);
      }

      this._dropPoints = this._dropPoints.slice(1);

      this.child.updateValues(this._ground, this._maxY, this._dropPoints.length);

      if (!this._paused) {
        window.setTimeout(() => {
          this.iterateWater();
        }, 5);
      }

    } else {
      this.child._end = true;
      this.child._answer = this.countWater();
    }
  }

  private countWater(): number {
    let waterCount = 0;
    for (let i = this._minY; i <= this._maxY; i++) {
      this._ground[i].forEach((cell) => {
        if (cell === "~") {
          waterCount++;
        }
      });
    }

    return waterCount;
  }

  private fillOverflowRow(x: number, y: number) {
    let minFound = false;
    let minX = x;
    let maxFound = false;
    let maxX = x;

    this._ground[y][x] = "|";

    while (!minFound) {
      if (this._ground[y][minX - 1] === "|" && this._ground[y + 1][minX - 1] === "|") {
        minFound = true;
      }
      else if (this._ground[y][minX - 1] === "." || this._ground[y][minX - 1] === "|") {
        if (this._ground[y + 1][minX - 1] === ".") {
          minFound = true;
          if (this._dropPoints.find((point) => {
            return point.x === minX - 1 && point.y === y;
          }) === undefined) {
            this._dropPoints.push(<iLocation>{
              x: minX - 1,
              y: y
            });
          }
        }
        this._ground[y][minX - 1] = "|";
        minX--;
      } else if (this._ground[y][minX - 1] === "#") {
        minFound = true;
      } else {
      }
    }

    while (!maxFound) {
      if (this._ground[y][maxX + 1] === "|" && this._ground[y + 1][maxX + 1] === "|") {
        maxFound = true;
      } else if (this._ground[y][maxX + 1] === "." || this._ground[y][maxX + 1] === "|") {
        if (this._ground[y + 1][maxX + 1] === ".") {
          maxFound = true;
          if (this._dropPoints.find((point) => {
            return point.x === maxX + 1 && point.y === y;
          }) === undefined) {
            this._dropPoints.push(<iLocation>{
              x: maxX + 1,
              y: y
            });
          }
        }
        this._ground[y][maxX + 1] = "|";
        maxX++;
      } else if (this._ground[y][maxX + 1] === "#") {
        maxFound = true;
      } else {
      }
    }
  }

  private fillToDropPoint(dropPoint: iLocation, lowestY: number) {
    for (let i = dropPoint.y + 1; i <= lowestY; i++) {
      this._ground[i][dropPoint.x] = "|";
    }
  }

  private findRowConfinedCoords(x: number, y: number): number[] {
    let coords = new Array<number>();

    let xMax = x;
    let xMin = x;

    let minEndFound = false;
    let maxEndFound = false;
    let contained = true;

    while (!minEndFound) {
      if ((this._ground[y][xMin - 1] === "." || this._ground[y][xMin - 1] === "|" || this._ground[y][xMin - 1] === "~") &&
        (this._ground[y + 1][xMin - 1] === "#" ||
          this._ground[y + 1][xMin - 1] === "~" ||
          this._ground[y + 1][xMin - 1] === "|")) {
        xMin--;
      } else if (this._ground[y][xMin - 1] === "|" && this._ground[y + 1][xMin - 1] === ".") {
        xMin--;
      }
      else if (this._ground[y][xMin - 1] === "#") {
        minEndFound = true;
      } else if (this._ground[y][xMin - 1] === "." && this._ground[y + 1][xMin - 1] === ".") {
        minEndFound = true;
        contained = false;
      } else {
      }
    }

    if (contained) {
      while (!maxEndFound) {
        if (((this._ground[y][xMax + 1] === "." || this._ground[y][xMax + 1] === "|" || this._ground[y][xMax + 1] === "~") &&
          (this._ground[y + 1][xMax + 1] === "#" ||
            this._ground[y + 1][xMax + 1] === "~" ||
            this._ground[y + 1][xMax + 1] === "|"))) {
          xMax++;
        } else if (this._ground[y][xMax + 1] === "|" && this._ground[y + 1][xMax + 1] === ".") {
          xMax++;
        } else if (this._ground[y][xMax + 1] === "#") {
          maxEndFound = true;
        } else if (this._ground[y][xMax + 1] === "." && this._ground[y + 1][xMax + 1] === ".") {
          maxEndFound = true;
          contained = false;
        } else {
        }
      }
    }

    if (contained) {
      coords.push(xMin);
      coords.push(xMax);
    }

    return coords;
  }

  private findLowestPoint(dropPoint: iLocation): number {
    let lowestY = 0;
    let bottomFound = false;

    while (!bottomFound) {
      if (dropPoint.y + lowestY + 1 > this._maxY) {
        bottomFound = true;
        lowestY = null;
      } else if (this._ground[dropPoint.y + lowestY + 1][dropPoint.x] === "#" ||
        this._ground[dropPoint.y + lowestY + 1][dropPoint.x] === "~") {
        bottomFound = true;
        lowestY = dropPoint.y + lowestY;
      } else {
        lowestY++;
      }
    }

    return lowestY;
  }

  private init() {
    this._ground = new Array<Array<string>>();
    this._dropPoints = new Array<iLocation>();
    this._maxY = 0;
    this._minY = 10000;
    this._paused = true;

    for (let j = 0; j < 2000; j++) {
      let newRow = new Array<string>();

      for (let i = 0; i < 1000; i++) {
        newRow.push(".");
      }

      this._ground.push(newRow);
    }

    this._ground[0][500] = "+";
    this._dropPoints.push(<iLocation>{
      x: 500,
      y: 0
    });

    this.inputString.split("\n").forEach((row) => {
      const rowSplit = row.split(", ");
      let x = 0;
      let xMax = 1;
      let y = 0;
      let yMax = 0;

      if (rowSplit[0].split("=")[0] === "x") {
        x = Number.parseInt(rowSplit[0].split("=")[1], 10);
        xMax = x;
        y = Number.parseInt(rowSplit[1].split("=")[1].split("..")[0], 10);
        yMax = Number.parseInt(rowSplit[1].split("=")[1].split("..")[1], 10);

        if (yMax > this._maxY) {
          this._maxY = yMax;
        }

        if (y < this._minY) {
          this._minY = y;
        }
      } else {
        y = Number.parseInt(rowSplit[0].split("=")[1], 10);
        yMax = y;
        if (yMax > this._maxY) {
          this._maxY = yMax;
        }

        if (y < this._minY) {
          this._minY = y;
        }
        x = Number.parseInt(rowSplit[1].split("=")[1].split("..")[0], 10);
        xMax = Number.parseInt(rowSplit[1].split("=")[1].split("..")[1], 10);
      }

      for (let j = y; j <= yMax; j++) {
        for (let i = x; i <= xMax; i++) {
          this._ground[j][i] = "#";
        }
      }
    });
  }

  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { ground: this._ground, maxY: this._maxY, dropPoints: this._dropPoints.length };

    const dialogRef = this.dialog.open(WaterDisplayComponent, dialogConfig);

    this.child = dialogRef.componentInstance;
    dialogRef.componentInstance.iterateParent.subscribe((data: any) => {
      this.iterateWater();
    })

    dialogRef.componentInstance.togglePause.subscribe(() => {
      this._paused = !this._paused;
    });
  }
}

interface iLocation {
  x: number,
  y: number
}
