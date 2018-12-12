import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-2018-day13',
  templateUrl: './day13.component.html'
})
export class Day13_2018Component implements OnInit {

  constructor(public dialog: MatDialog) { }

  public inputString: string;

  private _points: iPoint[];
  private _displayArrays: string[][];
  private _displayStrings: string[];
  private _iterations: number;

  ngOnInit() {
  }

  public calculate(): void {
    this.init()

    this.startIterating();
    this.openDialog();
  }

  private init() {
    this._points = new Array<iPoint>();
    this._iterations = 0;

    this.inputString.split("\n").forEach((value) => {
      this._points.push(<iPoint>{
        posX: Number.parseInt(value.split("<")[1].split(",")[0], 10),
        posY: Number.parseInt(value.split("<")[1].split(",")[1].split(">")[0], 10),
        velX: Number.parseInt(value.split(">")[1].split("<")[1].split(",")[0], 10),
        velY: Number.parseInt(value.split(">")[1].split(",")[1].split(">")[0], 10)
      })
    });

    this.resetArrays();
  }

  private resetArrays() {
    this._displayArrays = new Array<Array<string>>();
    this._displayStrings = new Array<string>();

    for (let i = 0; i < 500; i++) {
      this._displayArrays[i] = new Array<string>();
      for (let j = 0; j < 500; j++) {
        this._displayArrays[i][j] = "0";
      }
    }
  }


  private openDialog() {
    const dialogRef = this.dialog.open(AnswerDialogComponent, {data: this._displayStrings});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
    });
  }

  private startIterating() {
    this.iterate();
    this._iterations++;
    while (!this.detectWord()) { 
      this.iterate();
      this._iterations++;
    }

    this.populateDisplayStrings();
  }

  private iterate() {
    this._points.forEach((point) => {
      point.posX += point.velX;
      point.posY += point.velY;
    })
  }

  private detectWord():boolean {
    for (let i = 0; i < this._points.length; i++) {
      var posx = this._points[0].posX;

      var count = this._points.filter((point) => {
        return point.posX === posx;
      }).length;

      
      if (count > 4 ) {
        console.log(`detect word count: ${count}`);
        return true;
      }
    }

    return false;
  }

  private populateDisplayStrings() {
    this.resetArrays();
    this._points.forEach((point) => {
      this._displayArrays[point.posY][point.posX] = '#';
    });

    this._displayArrays.forEach((arr) => {
      const arrJoined = arr.join("");
      if (arrJoined.replace(/0/g, '').length !== 0) {
        this._displayStrings.push(arrJoined);
      }
    })

    if (this._displayStrings.length > 10) {
      console.log(`reiterating: ${this._displayStrings.length}`);
      this.startIterating();
    }
  }
}

@Component ({ 
  selector: 'answer-dialog',
  styles: [`span {white-space: pre;
  overflow: scroll }`],
  template: `<mat-dialog-content class="mat-typography">
  <div *ngFor="let row of rows">
    <span>{{row}}</span>
  </div>
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Cancel</button>
</mat-dialog-actions>`

})

export class AnswerDialogComponent {
  constructor(public dialogRef: MatDialogRef<AnswerDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public rows: string[]) {}
  closeDialog() {
    this.dialogRef.close();
  }
}

interface iPoint {
  posX: number,
  posY: number,
  velX: number,
  velY: number
}
