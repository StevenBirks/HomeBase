import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BreadcrumbsModule } from 'ng6-breadcrumbs';

@Component({
  selector: 'app-water-display',
  templateUrl: './water-display.component.html',
  styleUrls: ['./water-display.component.scss']
})
export class WaterDisplayComponent implements OnInit {
  _ground: string[];
  _dropPointCount: number;
  playPause: string;
  _end: boolean;
  _answer: number;

  constructor(public dialogRef: MatDialogRef<WaterDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) data: { ground: string[][], maxY: number, dropPoints: number }) {

    this.playPause = "Play";

    this.updateValues(data.ground, data.maxY, data.dropPoints); 
  }

  @Output() iterateParent = new EventEmitter<any>();
  @Output() togglePause = new EventEmitter<any>();

  public updateValues(ground: string[][], maxY: number, dropPoints: number) {
    this._ground = new Array<string>();
    let y = -1;
    ground.forEach((row) => {
      y++;
      if (y <= maxY) {
        this._ground.push(row.join(""));
      }
    });

    this._dropPointCount = dropPoints;
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
