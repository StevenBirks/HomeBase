import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day3-5',
  templateUrl: './day3-5.component.html'
})
export class Day3_5_2018Component implements OnInit {
  public inputString: string;
  public answer: number;

  private _claims: iClaim[];
  private _nonOverlappingClaims: number[];
  private _sheet: iInch[][];

  constructor() { }

  ngOnInit() {
  };

  public calculate(): void {
    let inputRows = this.inputString.split("\n");
    this._claims = new Array<iClaim>();
    this._nonOverlappingClaims = new Array<number>();

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
      this._nonOverlappingClaims.push(claim.ref);
    });

    this.initialiseSheet();

    this.placeClaims();

    this.markOverlappingClaims();

    this.answer = this._nonOverlappingClaims[0];
    console.log(this._nonOverlappingClaims);
  }

  private initialiseSheet() {
    this._sheet = new Array<Array<iInch>>();

    for(let i = 0; i < 1000; i++) {
      this._sheet[i] = new Array<iInch>();
      for (let j = 0; j < 1000; j++) {
        this._sheet[i][j] = <iInch> { claimRefs: new Array<number>(), value: 0 };
      }
    }
  }

  private placeClaims() {
    this._claims.forEach((claim) => {
      for (let i = claim.x; i < claim.x + claim.width; i++) {
        for (let j = claim.y; j < claim.y + claim.height; j++) {
          this._sheet[j][i].value++
          this._sheet[j][i].claimRefs.push(claim.ref);
        }
      }
    });
  }

  private markOverlappingClaims() {
    let overlaps = 0;
    for(let i = 0; i < 1000; i++) {
      for (let j = 0; j < 1000; j++) {
        if (this._sheet[i][j].value > 1) {
          this._sheet[i][j].claimRefs.forEach((claimRef) => {
            this.markClaimAsOverlapping(claimRef);
          });
        };
      }
    };
  }

  private markClaimAsOverlapping(claimRef: number) {
    const index = this._nonOverlappingClaims.indexOf(claimRef);

    if (index !== -1) {
      this._nonOverlappingClaims.splice(index, 1);
    }
  }
}

interface iClaim {
  ref: number,
  x: number,
  y: number,
  height: number,
  width: number
}

interface iInch {
  value: number;
  claimRefs: number[]
}
