import { Component, Inject, Output, EventEmitter, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-Droid-display',
  templateUrl: './Droid-display.component.html',
  styleUrls: ['./Droid-display.component.scss']
})
export class Droid201915DisplayComponent {
  _board: string[];
  _end: boolean;
  _minutes: number;

  constructor(public dialogRef: MatDialogRef<Droid201915DisplayComponent>,
    @Inject(MAT_DIALOG_DATA) data: { board: string[][] }) {

    this._end = false;
    this._minutes = 0;

    this.updateValues(data.board);
  }

  @Output() setDirection = new EventEmitter<number>();
  @Output() iterateO2 = new EventEmitter<any>();
  @Output() iterate = new EventEmitter<any>();
  @Output() stopEvent = new EventEmitter<any>();

  public updateValues(board: string[][]) {
    this._board = new Array<string>();

    board.forEach((row) => {
      this._board.push(row.join(""))//.replace(/3/g, "="));
    })
  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(e: KeyboardEvent) {
    if (e.keyCode === 38) {
      this.up();
    }
    else if (e.keyCode === 40) {
      this.down();
    }
    else if (e.keyCode === 37) {
      this.left();
    }
    else if (e.keyCode === 39) {
      this.right();
    }
  }

  public prgressO2Iteration() {
    this.iterateO2.emit();
  }

  public iterateDroid() {
    this.iterate.emit();
  }

  public stop() {
    this.stopEvent.emit();
  }

  public up() {
    this.setDirection.emit(1);
  }

  public down() {
    this.setDirection.emit(2);
  }

  public left() {
    this.setDirection.emit(3);
  }

  public right() {
    this.setDirection.emit(4);
  }

  public victory() {
    this._end = true;
  }

  public setMintes(minutes: number) {
    this._minutes = minutes;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
