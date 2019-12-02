import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2019-day2-5',
  templateUrl: './day2-5.component.html'
})
export class Day2_5_2019Component implements OnInit {
  constructor() { }

  public inputString: string;
  public answer: number

  private _values: number[];
  private _instructionPointer: number;
  private _noun: number;
  private _verb: number;

  ngOnInit() {
  }

  public calculate(): void {
    this._noun = -1;
    this._verb = 0;   
    this.initialseMemory();

    while (this._values[0] != 19690720) {
      this.initialseMemory();
      this.incrementNounAndVerb();
      this.setNounAndVerbValues();

      this.iterate();
    }

    this.answer = (100 * this._noun) + this._verb;
  }

  private iterate() {
    while (this._values[this._instructionPointer] !== 99) {      
      this.calculateNext();
    }
  }

  private calculateNext() {
    if (this._values[this._instructionPointer] === 1) {
      this._values[this._values[this._instructionPointer + 3]] = this._values[this._values[this._instructionPointer + 1]] + this._values[this._values[this._instructionPointer + 2]];
      this._instructionPointer += 4;
    } else if (this._values[this._instructionPointer] === 2) {
      this._values[this._values[this._instructionPointer + 3]] = this._values[this._values[this._instructionPointer + 1]] * this._values[this._values[this._instructionPointer + 2]];
      this._instructionPointer += 4;
    }
  }

  private incrementNounAndVerb() {
    if (this._noun === 99) {
      this._noun = 0;
      this._verb++;

    } else {
      this._noun++;
    }
  }

  private setNounAndVerbValues() {
    this._values[1] = this._noun;
    this._values[2] = this._verb;
  }

  private initialseMemory() {
    this._values = new Array<number>();
    this.inputString.split(",").forEach((value) => {
      this._values.push(Number.parseInt(value));
    });

    this._instructionPointer = 0;
  }
}
