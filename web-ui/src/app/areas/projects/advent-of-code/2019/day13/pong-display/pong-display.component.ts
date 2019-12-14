import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pong-display',
  templateUrl: './pong-display.component.html',
  styleUrls: ['./pong-display.component.scss']
})
export class Pong201913DisplayComponent {
  _board: string[];
  _end: boolean;
  _score: number;

  constructor(public dialogRef: MatDialogRef<Pong201913DisplayComponent>,
    @Inject(MAT_DIALOG_DATA) data: { board: number[][], score: number }) {
    
      this._end = false;

    this.updateValues(data.board, data.score);
  }

  @Output() setJoystick = new EventEmitter<number>();

  public updateValues(board: number[][], score: number) {
    this._board = new Array<string>();

    board.forEach((row) => {
      this._board.push(row.join("").replace(/3/g, "=").replace(/4/g, "●"));//.replace(/1/g, "∎"));//.replace(/0/g, "◾️").replace(/1/g, "∎").replace(/2/g, "🎁"));
    })

    this._score = score;
  }

  public victory() {
    this._end = true;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
