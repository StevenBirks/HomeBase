import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day4-5',
  templateUrl: './day4-5.component.html'
})
export class Day4_5Component implements OnInit {

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
        if (rowItemsArrayPhrases.length === 0) {
          rowItemsArrayPhrases.push(item);
        } else {
          const tempPhrases = rowItemsArrayPhrases.slice(0);
          for (const currentItem of tempPhrases) {
            if (!this._rearrangeCheck(currentItem, item)) {
              valid = false;
              break;
            }
          }

          if (!valid) {
            break;
          }

          rowItemsArrayPhrases.push(item);
        }
      }

      if (valid) {
        validCount++
      }
    }

    this.answer = validCount;
  }

  private _rearrangeCheck(currentPhrase: string, newString: string): boolean {
    let currentCharArray = currentPhrase.split("");
    let newCharArray = newString.split("");

    for (const char of newCharArray) {
      const index = currentCharArray.indexOf(char);

      if (index === -1) {
        return true;
      } else {
        currentCharArray.splice(index, 1);
      }
    }

    return currentCharArray.length > 0;
  };
}