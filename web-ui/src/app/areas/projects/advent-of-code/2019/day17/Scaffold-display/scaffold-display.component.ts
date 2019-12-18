import { Component, Inject, Output, EventEmitter, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-scaffold-display',
  templateUrl: './scaffold-display.component.html',
  styleUrls: ['./scaffold-display.component.scss']
})
export class Scaffold201917DisplayComponent {
  _board: string[];
  _answer: number;

  constructor(public dialogRef: MatDialogRef<Scaffold201917DisplayComponent>,
    @Inject(MAT_DIALOG_DATA) data: { board: string[][] }) {

    this._answer = 0;

    this.updateValues(data.board);
  }

  @Output() stopEvent = new EventEmitter<any>();

  public updateValues(board: string[][]) {
    this._board = new Array<string>();

    board.forEach((row) => {
      this._board.push(row.join(""));
    });
  }

  public victory() {
  }

  public setAnswer(answer: number) {
    this._answer = answer;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
