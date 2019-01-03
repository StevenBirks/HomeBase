import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { LabelDisplayComponent } from './label-display/label-display.component';

@Component({
  selector: 'app-storage-labelling',
  templateUrl: './storage-labelling.component.html',
  styleUrls: ['./storage-labelling.component.scss']
})
export class StorageLabellingComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  public inputLabel: string;

  private _labels: string[];
  @ViewChild(LabelDisplayComponent) child: LabelDisplayComponent;

  ngOnInit() {
    this._labels = new Array<string>();
  }

  addLabelToList() {
    if (this.inputLabel) {
      this._labels.push(this.inputLabel);
    }
    
    this.inputLabel = null;
  }

  printWindow() {
    this.openDialog();
  }

  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { labels: this._labels };

    const dialogRef = this.dialog.open(LabelDisplayComponent, dialogConfig);

    this.child = dialogRef.componentInstance;
  }
}
