import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day12-5',
  templateUrl: './day12-5.component.html'
})
export class Day12_5Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;

  private _groupCount: number;
  private _unconnectedGroups: number[];
  private _connectedIndexes: number[];
  
  ngOnInit() {
  }

  public calculate(): void {
    var rowsString = this.inputString.split("\n");
    this._groupCount = 0;
    this._unconnectedGroups = new Array<number>();

    for (let i = 0; i < 2000; i++) {
      this._unconnectedGroups.push(i);
    }

    while (this._unconnectedGroups.length > 0) {
      this._connectedIndexes = new Array<number>();
      
      let rowIndexesToCompute = new Array<number>();
      rowIndexesToCompute.push(this._unconnectedGroups[0]);
  
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

        this._unconnectedGroups = this._unconnectedGroups.filter((group) => {
          return group !== rowIndexesToCompute[0];
        });

        rowIndexesToCompute.shift();
      }

      this._groupCount++;
    }

    this.answer = this._groupCount;
  } 
}
