import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Lumber201818DisplayComponent } from './lumber-display/lumber-display.component';

@Component({
  selector: 'app-2018-day18-5',
  templateUrl: './day18-5.component.html'
})
export class Day18_5_2018Component implements OnInit {
  _paused: boolean;
  _iteration: number;

  constructor(public dialog: MatDialog) { }

  @ViewChild(Lumber201818DisplayComponent) child: Lumber201818DisplayComponent;

  public inputString: string;
  public answer: number;

  _ground: string[][];
  _tempGround: string[][];
  _duplicateMax: number;

  ngOnInit() {
  }

  public calculate(): void {
    this.init();
    this.openDialog();
  }

  private iterateGround() {
    if (this._iteration > (this._duplicateMax - 1)) {
      return;
    }
    this._iteration++;
    this._tempGround = new Array<Array<string>>();

    for (let i = 0; i < this._ground.length; i++) {
      this._tempGround.push(new Array<string>());
      for (let j = 0; j < this._ground[i].length; j++) {
        const type = this._ground[i][j] === "."
          ? landType.open
          : this._ground[i][j] === "#"
            ? landType.yard
            : landType.trees;

        switch (type) {
          case landType.open:
            this.processOpen(i, j);
            break;
          case landType.yard:
            this.processYard(i, j);
            break;
          case landType.trees:
            this.processTrees(i, j);
            break;
        }
      }
    }

    this._ground = this._tempGround;

    this.child.updateValues(this._ground, this._iteration);

    if (!this._paused && this._iteration < this._duplicateMax) {
      if (this._iteration % 5000 === 0) {
        this.iterateGround();

      } else {
        window.setTimeout(() => {
          this.iterateGround();
        }, 1);
      }
    } else if (this._iteration === this._duplicateMax) {
      this.child._end = true;
      this.child._answer = this.countLumber();
    }
  }

  private processOpen(i: number, j: number) {
    let treeCount = 0;
    if (i > 0) {
      if (this._ground[i - 1][j - 1] === "|") {
        treeCount++;
      }
      if (this._ground[i - 1][j] === "|") {
        treeCount++;
      }
      if (this._ground[i - 1][j + 1] === "|") {
        treeCount++;
      }
    }

    if (this._ground[i][j - 1] === "|") {
      treeCount++;
    }
    if (this._ground[i][j + 1] === "|") {
      treeCount++;
    }

    if (i < this._ground.length - 1) {
      if (this._ground[i + 1][j - 1] === "|") {
        treeCount++;
      }
      if (this._ground[i + 1][j] === "|") {
        treeCount++;
      }
      if (this._ground[i + 1][j + 1] === "|") {
        treeCount++;
      }
    }

    if (treeCount > 2) {
      this._tempGround[i].push("|");
    } else {
      this._tempGround[i].push(".");
    }
  }

  private processYard(i: number, j: number) {
    let treeCount = 0;
    let yardCount = 0
    if (i > 0) {
      if (this._ground[i - 1][j - 1] === "|") {
        treeCount++;
      } else if (this._ground[i - 1][j - 1] === "#") {
        yardCount++;
      }
      if (this._ground[i - 1][j] === "|") {
        treeCount++;
      } else if (this._ground[i - 1][j] === "#") {
        yardCount++;
      }
      if (this._ground[i - 1][j + 1] === "|") {
        treeCount++;
      } else if (this._ground[i - 1][j + 1] === "#") {
        yardCount++;
      }
    }

    if (this._ground[i][j - 1] === "|") {
      treeCount++;
    } else if (this._ground[i][j - 1] === "#") {
      yardCount++;
    }
    if (this._ground[i][j + 1] === "|") {
      treeCount++;
    } else if (this._ground[i][j + 1] === "#") {
      yardCount++;
    }

    if (i < this._ground.length - 1) {
      if (this._ground[i + 1][j - 1] === "|") {
        treeCount++;
      } else if (this._ground[i + 1][j - 1] === "#") {
        yardCount++;
      }
      if (this._ground[i + 1][j] === "|") {
        treeCount++;
      } else if (this._ground[i + 1][j] === "#") {
        yardCount++;
      }
      if (this._ground[i + 1][j + 1] === "|") {
        treeCount++;
      } else if (this._ground[i + 1][j + 1] === "#") {
        yardCount++;
      }
    }

    if (treeCount > 0 && yardCount > 0) {
      this._tempGround[i].push("#");
    } else {
      this._tempGround[i].push(".");
    }
  }

  private processTrees(i: number, j: number) {
    let yardCount = 0;
    if (i > 0) {
      if (this._ground[i - 1][j - 1] === "#") {
        yardCount++;
      }
      if (this._ground[i - 1][j] === "#") {
        yardCount++;
      }
      if (this._ground[i - 1][j + 1] === "#") {
        yardCount++;
      }
    }

    if (this._ground[i][j - 1] === "#") {
      yardCount++;
    }
    if (this._ground[i][j + 1] === "#") {
      yardCount++;
    }

    if (i < this._ground.length - 1) {
      if (this._ground[i + 1][j - 1] === "#") {
        yardCount++;
      }
      if (this._ground[i + 1][j] === "#") {
        yardCount++;
      }
      if (this._ground[i + 1][j + 1] === "#") {
        yardCount++;
      }
    }

    if (yardCount > 2) {
      this._tempGround[i].push("#");
    } else {
      this._tempGround[i].push("|");
    }
  }

  private countLumber(): number {
    let treeCount = 0;
    let yardCount = 0;

    this._ground.forEach((row) => {
      row.forEach((cell) => {
        if (cell === "|") {
          treeCount++;
        } else if (cell === "#") {
          yardCount++;
        }
      })
    })

    return yardCount * treeCount;
  }

  private init() {
    this._ground = new Array<Array<string>>();
    this._paused = true;
    this._iteration = 0;
    this._duplicateMax = 1280;

    this.inputString.split("\n").forEach((row) => {
      let newRow = new Array<string>();
      row.split("").forEach((cell) => {
        newRow.push(cell);
      });

      this._ground.push(newRow);
    });
  }

  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { ground: this._ground, iteration: this._iteration };

    const dialogRef = this.dialog.open(Lumber201818DisplayComponent, dialogConfig);

    this.child = dialogRef.componentInstance;
    dialogRef.componentInstance.iterateParent.subscribe((data: any) => {
      this.iterateGround();
    })

    dialogRef.componentInstance.togglePause.subscribe(() => {
      this._paused = !this._paused;
    });
  }
}

enum landType {
  open,
  yard,
  trees
}