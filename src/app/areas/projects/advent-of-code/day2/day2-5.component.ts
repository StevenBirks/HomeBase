import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day2-5',
  templateUrl: './day2-5.component.html'
})
export class Day2_5Component implements OnInit {

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

      let stop = false;

      for (const item of rowItemsArrayInt) {

        for (const value of rowItemsArrayInt) {
          if (item !== value && item % value === 0) {            
            checkSum += (item / value);
            stop = true;
          }

          if (stop) {
            break;
          } 
        }

        if (stop) {
          break;
        } 
      }



    }

    this.answer = checkSum;
  } 
}
