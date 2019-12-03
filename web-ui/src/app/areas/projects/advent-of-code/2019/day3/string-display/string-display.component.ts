import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-string-display',
  templateUrl: './string-display.component.html',
  styleUrls: ['./string-display.component.scss']
})
export class StringDisplay201903Component implements OnInit {
  _matrix: string[][];
  _answer: number;

  constructor(public dialogRef: MatDialogRef<StringDisplay201903Component>,
    @Inject(MAT_DIALOG_DATA) data: { matrix: string[][], answer: number }) {

    this.updateValues(data.matrix, data.answer); 
  }

  @Output() iterateParent = new EventEmitter<any>();
  @Output() togglePause = new EventEmitter<any>();

  public updateValues(matrix: string[][], answer: number) {
    this._matrix = matrix;
    this._answer = answer;
  }

  public iterate(): void {
    this.iterateParent.emit();
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
