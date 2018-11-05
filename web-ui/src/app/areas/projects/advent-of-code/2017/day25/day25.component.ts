import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day25',
  templateUrl: './day25.component.html'
})
export class Day25Component implements OnInit {

  constructor() { 
  }

  public inputNumber: number;
  public answer: number;
  public step: number

  private _tape: boolean[];
  private _cursor: iCursor;
  private _state: state;

  ngOnInit() {
  }

  public calculate(): void {
    this.answer = 0;
    this._tape = new Array<boolean>();
    this._tape.push(false);

    this._cursor = <iCursor>{
      position: 0
    };

    this._state = state.A;
    this.step = 0;

    this._run();
  }

  private _run(): void {
    switch (this._state) {
      case state.A: {
        if (!this._readValue()) {
          this._writeValue(true);
          this._moveRight();
          this._state = state.B;
        } else {
          this._writeValue(false);
          this._moveRight();
          this._state = state.C;
        }

        break;
      }

      case state.B: {
        if (!this._readValue()) {
          //this._writeValue(false);
          this._moveLeft();
          this._state = state.A;
        } else {
          this._writeValue(false);
          this._moveRight();
          this._state = state.D;
        }

        break;
      }

      case state.C: {
        if (!this._readValue()) {
          this._writeValue(true);
          this._moveRight();
          this._state = state.D;
        } else {
          //this._writeValue(1);
          this._moveRight();
          this._state = state.A;
        }

        break;
      }

      case state.D: {
        if (!this._readValue()) {
          this._writeValue(true);
          this._moveLeft();
          this._state = state.E;
        } else {
          this._writeValue(false);
          this._moveLeft();
          this._state = state.D;
        }

        break;
      }

      case state.E: {
        if (!this._readValue()) {
          this._writeValue(true);
          this._moveRight();
          this._state = state.F;
        } else {
          //this._writeValue(1);
          this._moveLeft();
          this._state = state.B;
        }

        break;
      }

      case state.F: {
        if (!this._readValue()) {
          this._writeValue(true);
          this._moveRight();
          this._state = state.A;
        } else {
          //this._writeValue(1);
          this._moveRight();
          this._state = state.E;
        }

        break;
      }

      default: {
        break;
      }
    }

    this.step++;
    debugger;
    
    if (this.step < this.inputNumber) {
      setTimeout(() => {
        this._run();
      }, 1);
    } else {
      this.answer = this._checkSum();
    }
  }

  private _readValue(): boolean {
    return this._tape[this._cursor.position]
  }

  private _writeValue(value: boolean): void {
    this._tape[this._cursor.position] = value;
  }

  private _moveRight(): void {
    this._cursor.position++;

    if (this._cursor.position === this._tape.length) {
      this._tape.push(false);
    }
  }

  private _moveLeft(): void {
    this._cursor.position--;
    if (this._cursor.position === -1) {
      this._tape.unshift(false);
      this._cursor.position = 0;
    }
  }

  private _checkSum(): number {
    return this._tape.filter((bit) => {
      return bit;
    }).length;
  }
}

interface iCursor {
  position: number
}

enum state {
  A,
  B,
  C,
  D,
  E,
  F
}
