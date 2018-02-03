import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day8-5',
  templateUrl: './day8-5.component.html'
})
export class Day8_5_2015Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;

  private _totalStringLiteral: number;
  private _totalEncoded: number;

  ngOnInit() {
  }

  public calculate(): void {
    var inputRows = this.inputString.split("\n");
    this.answer = 0;

    this._totalEncoded = 0;
    this._totalStringLiteral = 0;

    for (const row of inputRows) {
      this._totalStringLiteral += row.length;

      this._totalEncoded += this._countEncodedString(row);

    }

    this.answer = this._totalEncoded - this._totalStringLiteral;
  }

  private _countEncodedString(row: string):number {
    let encodedInput = row.substr(1, row.length - 2);
    encodedInput = encodedInput.replace(/\\\\/g, '\\\\\\\\');
    encodedInput = encodedInput.replace(/\\x[0-9a-fA-F]{2}/g, '\\\\xxx');
    encodedInput = encodedInput.replace(/\\"/g, '123£');
    encodedInput = encodedInput.replace(/"/g, '\\"');
    encodedInput = `"\\"${encodedInput}\\""`;
    return encodedInput.length;
  }
}
