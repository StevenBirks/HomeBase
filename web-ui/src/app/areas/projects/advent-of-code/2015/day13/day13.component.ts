import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day13',
  templateUrl: './day13.component.html'
})
export class Day13_2015Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number;

  private _people: iPerson[];
  private _inputRows: iInputLine[];
  private _tables: iTable[];

  ngOnInit() {
  }

  public calculate(): void {
    var inputRows = this.inputString.split("\n");
    this._people = new Array<iPerson>();
    this._inputRows = new Array<iInputLine>();

    inputRows.forEach((row) => {
      const sign = row.split(" ")[2] === "gain" ? 1 : -1;

      let newInputLine = <iInputLine>{
        name: row.split(" ")[0],
        neighbour: row.split(" ")[10].substr(0,row.split(" ")[10].length - 1),
        happiness: sign * Number.parseInt(row.split(" ")[3])
      };

      this._inputRows.push(newInputLine);

    });

    this._tables = new Array<iTable>();

    const numberOfTablesMax = 7 * 6 * 5 * 4 * 3 * 2;
    console.log(this._inputRows);
    console.log(numberOfTablesMax);

    while (this._tables.length < numberOfTablesMax) {
      var newTable = <iTable>{
        people: new Array<iPerson>(<iPerson> { name: this._inputRows[0].name }),
        totalHappiness: 0
      };
    }

    

    this.answer = this._tables.reduce((prev, current) => {
      return (prev.totalHappiness > current.totalHappiness) ? prev : current
    }).totalHappiness;
  }
}

interface iPerson {
  name: string,
}

interface iInputLine {
  name: string,
  neighbour: string,
  happiness: number
}

interface iTable {
  people: iPerson[],
  totalHappiness: number
}
