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

  public inputLabelHeader: string;
  public inputLabelSub: string;

  private _labels: string[];
  @ViewChild(LabelDisplayComponent) child: LabelDisplayComponent;

  ngOnInit() {
    this._labels = new Array<string>();
  }

  addLabelToList() {
    if (this.inputLabelHeader) {
      this._labels.push(`${this.inputLabelHeader} - ${this.inputLabelSub}`);
    }
    
    this.inputLabelHeader = null;
    this.inputLabelSub = null;
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
