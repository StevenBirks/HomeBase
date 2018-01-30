import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day2',
  templateUrl: './day2.component.html'
})
export class Day2Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;
  
  ngOnInit() {
  }

  public calculate(): void {
    var rowsString = this.inputString.split("\n");
    let checkSum = 0;

    for (const row of rowsString) {
      const rowItemsArrayString = row.split("\t");
      const rowItemsArrayInt = new Array<number>();
      for (const item of rowItemsArrayString) {
        rowItemsArrayInt.push(Number.parseInt(item));
      }

      var max = rowItemsArrayInt.reduce((a:number, b:number) => {
        return Math.max(a, b);
      });

      var min = rowItemsArrayInt.reduce((a:number, b:number) => {
        return Math.min(a, b);
      });

      checkSum += max - min;
    }

    this.answer = checkSum;
  } 
}
