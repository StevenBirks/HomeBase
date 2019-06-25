import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day4',
  templateUrl: './day4.component.html'
})
export class Day4Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;
  
  ngOnInit() {
  }

  public calculate(): void {
    const rowsString = this.inputString.split("\n");
    let validCount = 0;

    for (const row of rowsString) {
      const rowItemsArrayString = row.split(" ");
      const rowItemsArrayPhrases = new Array<string>();
      let valid = true;
      for (const item of rowItemsArrayString) {
        if (rowItemsArrayPhrases.indexOf(item) === -1) {
          rowItemsArrayPhrases.push(item);
        } else {
          valid = false;
          break;
        }
      }

      if (valid) {
      validCount++
      }
    }

    this.answer = validCount;
  } 
}