import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-lumber-display',
  templateUrl: './lumber-display.component.html',
  styleUrls: ['./lumber-display.component.scss']
})
export class Lumber201818DisplayComponent implements OnInit {
  _ground: string[];
  _iteration: number;
  _dropPointCount: number;
  playPause: string;
  _end: boolean;
  _answer: number;

  constructor(public dialogRef: MatDialogRef<Lumber201818DisplayComponent>,
    @Inject(MAT_DIALOG_DATA) data: { ground: string[][], iteration: number }) {

    this.playPause = "Play";

    this.updateValues(data.ground, data.iteration); 
  }

  @Output() iterateParent = new EventEmitter<any>();
  @Output() togglePause = new EventEmitter<any>();

  public updateValues(ground: string[][], iteration: number) {
    this._ground = new Array<string>();
    ground.forEach((row) => {
        this._ground.push(row.join(""));
    });

    this._iteration = iteration;
  }

  public victory() {
    this._end = true;
  }

  public iterate(): void {
    this.iterateParent.emit();
  }

  public toggle(): void {
    this.togglePause.emit();

    if (this.playPause === "Play") {
      this.playPause = "Pause";
      this.iterate();
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
