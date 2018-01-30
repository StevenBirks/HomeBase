import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day12',
  templateUrl: './day12.component.html'
})
export class Day12Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;

  private _connectedIndexes: number[];
  
  ngOnInit() {
  }

  public calculate(): void {
    var rowsString = this.inputString.split("\n");
    this._connectedIndexes = new Array<number>();

    let rowIndexesToCompute = new Array<number>();
    rowIndexesToCompute.push(0);

    while (rowIndexesToCompute.length > 0) {
      let row = rowsString[rowIndexesToCompute[0]];
      let pipesString = row.substr(row.indexOf(">") + 2);
      let pipesInIndex = pipesString.split(", ");
      pipesInIndex.forEach((pipe) => {
        if (this._connectedIndexes.indexOf(Number.parseInt(pipe)) === -1 &&
            rowIndexesToCompute.indexOf(Number.parseInt(pipe)) === -1) {
          rowIndexesToCompute.push(Number.parseInt(pipe));
        }
      });
      this._connectedIndexes.push(rowIndexesToCompute[0]);
      rowIndexesToCompute.shift();
    }

    this.answer = this._connectedIndexes.length;
  } 
}
