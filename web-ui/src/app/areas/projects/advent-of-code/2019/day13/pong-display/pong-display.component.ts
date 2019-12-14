import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pong-display',
  templateUrl: './pong-display.component.html',
  styleUrls: ['./pong-display.component.scss']
})
export class Pong201913DisplayComponent implements OnInit {
  _board: string[];
  playPause: string;
  _end: boolean;
  _score: number;


  constructor(public dialogRef: MatDialogRef<Pong201913DisplayComponent>,
    @Inject(MAT_DIALOG_DATA) data: { board: number[][], score: number }) {

    this.playPause = "Play";

    this.updateValues(data.board, data.score);
  }

  @Output() setJoystick = new EventEmitter<number>();
  @Output() togglePause = new EventEmitter<any>();

  public updateValues(board: number[][], score: number) {
    this._board = new Array<string>();

    board.forEach((row) => {
      this._board.push(row.join("").replace(/3/g, "3").replace(/4/g, "●"));//.replace(/0/g, "◾️").replace(/1/g, "▫️").replace(/2/g, "🎁"));
    })

    this._score = score;
  }

  public victory() {
    this._end = true;
  }

  public setNeutral(): void {
    this.setJoystick.emit(0);
  }

  public setLeft(): void {
    this.setJoystick.emit(-1);
  }

  public setRight(): void {
    this.setJoystick.emit(1);
  }

  public toggle(): void {
    this.togglePause.emit();

    if (this.playPause === "Play") {
      this.playPause = "Pause";
    } else {
      this.playPause = "Play";
    }
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
