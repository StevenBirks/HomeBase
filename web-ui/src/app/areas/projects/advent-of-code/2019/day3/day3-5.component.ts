import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { StringDisplay201903Component } from './string-display/string-display.component';

@Component({
  selector: 'app-2019-day3-5',
  templateUrl: './day3-5.component.html'
})
export class Day3_5_2019Component implements OnInit {
  constructor(public dialog: MatDialog) { }

  @ViewChild(StringDisplay201903Component) child: StringDisplay201903Component;

  public inputString: string;
  public answer: number;

  _matrix: string[][];
  _stringInputs: iStringWiggle[][];
  _startPoint: iCoord;
  _answer: number;

  ngOnInit() {
  }

  public calculate(): void {
    this.init();

    let wiggleNumber = 1;

    this._stringInputs.forEach((stringWiggles) => {
      this.processStringWiggles(stringWiggles, wiggleNumber);
      wiggleNumber++;
    })

    this._answer = this.calculateClosestPoint();
    this.answer = this._answer;

    //this.openDialog();
    //this.child.updateValues(this._matrix, this._answer);
  }

  private processStringWiggles(wiggles: iStringWiggle[], wiggleNumber: number) {
    let currentLocation = { x: this._startPoint.x, y: this._startPoint.y } as iCoord;

    wiggles.forEach((wiggle) => {
      for (let i = 0; i < wiggle.value; i++) {
        switch (wiggle.direction) {
          case edirection.up:
            currentLocation.y--;
            break;
          case edirection.down:
            currentLocation.y++;
            break;
          case edirection.left:
            currentLocation.x--;
            break;
          case edirection.right:
            currentLocation.x++;
            break;
        }

        const val = this._matrix[currentLocation.y][currentLocation.x];
        if (val !== "x" && (val === wiggleNumber.toString() || val === "o")) {
          this._matrix[currentLocation.y][currentLocation.x] = wiggleNumber.toString();
        } else {
          this._matrix[currentLocation.y][currentLocation.x] = "x";
        }
      }
    })
  }

  private calculateClosestPoint(): number {
    const intersections = new Array<iCoord>();

    for (let i = 0; i < this._matrix.length; i++) {
      for (let j = 0; j < this._matrix[0].length; j++) {
        if (this._matrix[i][j] === "x") {
          intersections.push({ x: j, y: i } as iCoord);
        }
      }
    }

    let smallestDistance = 99999999;
    intersections.forEach((intersection) => {

      const distance1 = this.wireToGetToLocation(this._stringInputs[0], intersection);
      const distance2 = this.wireToGetToLocation(this._stringInputs[1], intersection);

      if (distance1+distance2 < smallestDistance) {
        smallestDistance = distance1+distance2;
      }
    })

    return smallestDistance;
  }

  private wireToGetToLocation(wiggles: iStringWiggle[], intersection: iCoord):number {
    let steps = 0;
    let stepsUsed = 0;
    let currentLocation = { x: this._startPoint.x, y: this._startPoint.y } as iCoord;

    wiggles.forEach((wiggle) => {
      for (let i = 0; i < wiggle.value; i++) {
        switch (wiggle.direction) {
          case edirection.up:
            currentLocation.y--;
            break;
          case edirection.down:
            currentLocation.y++;
            break;
          case edirection.left:
            currentLocation.x--;
            break;
          case edirection.right:
            currentLocation.x++;
            break;
        }

        steps++;
        if (currentLocation.x === intersection.x && currentLocation.y === intersection.y) {
          stepsUsed = steps;
        }
      }
    })

    return stepsUsed;
  }

  private init() {
    const max = 18000;
    this._startPoint = { x: max / 2, y: max / 2 } as iCoord;
    this._matrix = new Array<Array<string>>(max);
    this._stringInputs = new Array<Array<iStringWiggle>>();

    for (let i = 0; i < max; i++) {
      this._matrix[i] = new Array<string>(max);
      for (let j = 0; j < max; j++) {
        this._matrix[i][j] = "o";
      }
    }

    this.inputString.split("\n").forEach((row) => {
      let stringWiggle = new Array<iStringWiggle>();
      row.split(",").forEach((wiggle) => {
        const value = Number.parseInt(wiggle.substring(1));
        let direction = edirection.up;

        switch (wiggle[0]) {
          case "D":
            direction = edirection.down;
            break;
          case "L":
            direction = edirection.left;
            break;
          case "R":
            direction = edirection.right;
            break;
        }
        stringWiggle.push({ direction: direction, value: value });
      });

      this._stringInputs.push(stringWiggle);
    });
  }

  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { ground: this._matrix };

    const dialogRef = this.dialog.open(StringDisplay201903Component, dialogConfig);

    this.child = dialogRef.componentInstance;
  }
}

interface iStringWiggle {
  direction: edirection,
  value: number
}

interface iCoord {
  x: number,
  y: number
}

enum edirection {
  up,
  down,
  left,
  right
}
