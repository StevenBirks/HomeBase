import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day3',
  templateUrl: './day3.component.html'
})
export class Day3_2018Component implements OnInit {
  public inputString: string;
  public answer: number;

  private _claims: iClaim[];
  private _sheet: number[][];

  constructor() { }

  ngOnInit() {
  };

  public calculate(): void {
    let inputRows = this.inputString.split("\n");
    this._claims = new Array<iClaim>();

    inputRows.forEach((row) => {
      const rowSplit = row.split(" ");

      let claim = <iClaim>{
        ref: Number.parseInt(rowSplit[0].replace('#', ''), 10),
        x: Number.parseInt(rowSplit[2].split(',')[0], 10),
        y: Number.parseInt(rowSplit[2].split(',')[1].replace(':', ''), 10),
        height: Number.parseInt(rowSplit[3].split('x')[1], 10),
        width: Number.parseInt(rowSplit[3].split('x')[0], 10)
      }

      this._claims.push(claim);
    });

    this.initialiseSheet();

    this.placeClaims();

    this.answer = this.countOverlaps();
  }

  private initialiseSheet() {
    this._sheet = new Array<Array<number>>();

    for(let i = 0; i < 1000; i++) {
      this._sheet[i] = new Array<number>();
      for (let j = 0; j < 1000; j++) {
        this._sheet[i][j] = 0;
      }
    }
  }

  private placeClaims() {
    this._claims.forEach((claim) => {
      for (let i = claim.x; i < claim.x + claim.width; i++) {
        for (let j = claim.y; j < claim.y + claim.height; j++) {
          this._sheet[j][i]++;
        }
      }
    });
  }

  private countOverlaps(): number {
    let overlaps = 0;
    for(let i = 0; i < 1000; i++) {
      for (let j = 0; j < 1000; j++) {
        if (this._sheet[i][j] > 1) {
          overlaps++;
        };
      }
    };

    return overlaps;
  }

}

interface iClaim {
  ref: number,
  x: number,
  y: number,
  height: number,
  width: number
}
