import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day8',
  templateUrl: './day8.component.html'
})
export class Day8_2015Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;

  private _totalStringLiteral: number;
  private _totalInMemory: number;

  ngOnInit() {
  }

  public calculate(): void {
    var inputRows = this.inputString.split("\n");
    this.answer = 0;

    this._totalInMemory = 0;
    this._totalStringLiteral = 0;

    for (const row of inputRows) {
      this._totalStringLiteral += row.length;

      this._totalInMemory += this._countInMemoryForString(row);

    }

    this.answer = this._totalStringLiteral - this._totalInMemory;
  }

  private _countInMemoryForString(row: string):number {
    let trimmedInput = row.substr(1, row.length - 2);
    trimmedInput = trimmedInput.replace(/\\\\/g, '\\');
    trimmedInput = trimmedInput.replace(/\\x[0-9a-fA-F]{2}/g, '#');
    trimmedInput = trimmedInput.replace(/\\"/g, '@');
    
    return trimmedInput.length;
  }
}
