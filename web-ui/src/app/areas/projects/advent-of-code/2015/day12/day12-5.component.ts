import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day12-5',
  templateUrl: './day12-5.component.html'
})
export class Day12_5_2015Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number;

  private _inputArray: string[];

  ngOnInit() {
  }

  public calculate(): void {  

   let thing = JSON.parse(this.inputString);
   console.log(thing);
   this.answer = this.countNonRedNumbers(thing);
  }

  private countNonRedNumbers(obj: any): number {
    let array;
    if (Array.isArray(obj))
        array = obj;
    else {
        array = Object.keys(obj).map(key => obj[key]);
        if (array.includes("red")) return 0;
    }

    return array.reduce((sum, item) => {
        let value = 0;
        if (typeof item === "number")
            value = item;
        else if (typeof item === "object")
            value = this.countNonRedNumbers(item);

        return sum + value;
    }, 0);
  }
}