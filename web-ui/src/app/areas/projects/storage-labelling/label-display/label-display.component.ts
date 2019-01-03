import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PrintService } from '../../../../shared/print/print.service';

@Component({
  selector: 'app-label-display',
  templateUrl: './label-display.component.html',
  styleUrls: ['./label-display.component.scss']
})
export class LabelDisplayComponent implements OnInit {
  _labels: string[];


  constructor(private printService: PrintService, public dialogRef: MatDialogRef<LabelDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) data: { labels: string[] }) {

    this.updateValues(data.labels);

    window.setTimeout(() => {
      document.querySelector(".label-display-content").addEventListener("click", () => {
        this.closeDialog();
      });
    }, 200);
  }

  public updateValues(labels: string[]) {
    this._labels = new Array<string>();
    labels.forEach((row) => {
      this._labels.push(row);
    });

    // allows for animation
    window.setTimeout(() => {
      this.printService.print();
    }, 200)
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
