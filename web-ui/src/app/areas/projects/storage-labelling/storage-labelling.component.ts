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

  private _labels: storageLabel[];

  @ViewChild(LabelDisplayComponent) child: LabelDisplayComponent;
  @ViewChild("labelHeader") headerField: ElementRef;

  ngOnInit() {
    this._labels = new Array<storageLabel>();
  }

  focusHeader() {
    this.headerField.nativeElement.focus();
  }

  addLabelToList() {
    if (this.inputLabelHeader) {
      this._labels.push(<storageLabel> {
        header: this.inputLabelHeader,
        subHeader: this.inputLabelSub
      });
    }
    
    this.inputLabelHeader = null;
    this.inputLabelSub = null;
    this.focusHeader();
  }

  editLabel(label: storageLabel) {
    this.inputLabelHeader = label.header;
    this.inputLabelSub = label.header;

    this.focusHeader();
    this.deleteLabel(label);
  }

  deleteLabel(label: storageLabel) {
    const index = this._labels.indexOf(label);

    this._labels.splice(index, 1);
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

export interface storageLabel {
  header: string,
  subHeader: string
}
