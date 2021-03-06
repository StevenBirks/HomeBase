import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-2015-day4-5',
  templateUrl: './day4-5.component.html'
})
export class Day4_5_2015Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number;

  
  ngOnInit() {
  }

  public calculate(): void {

    let found = false;
    let i = 0;

    while (!found) {
      i++;
      let input = `${this.inputString}${i}`;
      let result = Md5.hashStr(input);

      if (result.slice(0, 6) === '000000') {
        this.answer = i;
        found = true;
      }
    }
  }
}
