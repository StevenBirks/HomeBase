import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day2-5',
  templateUrl: './day2-5.component.html'
})
export class Day2_5_2015Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;

  private _presents: iPresent[];

  ngOnInit() {
  }

  public calculate(): void {
    var inputRows = this.inputString.split("\n");
    this.answer = 0;

    this._presents = new Array<iPresent>();

    for (const row of inputRows) {
      let newPresent = <iPresent>{
        length: Number.parseInt(row.split("x")[0]),
        width: Number.parseInt(row.split("x")[1]),
        height: Number.parseInt(row.split("x")[2])
      };

      this._presents.push(newPresent);
    }

    this._presents.forEach((present) => {
      this.answer += (present.length * present.height * present.width);

      let small = this._smallestSize(present)

      this.answer += this._smallestSize(present);
    })
  }

  private _smallestSize(present: iPresent): number {
    return (present.height * present.length) > (present.height * present.width)
      ? (present.height * present.width) > (present.width * present.length)
        ? 2 * (present.width + present.length)
        : 2 * (present.height + present.width)
      : (present.height * present.length) > (present.width * present.length)
        ? 2 * (present.width + present.length)
        : 2 * (present.height + present.length);
  }
}

interface iPresent {
  length: number,
  width: number,
  height: number
}
