import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day18-5',
  templateUrl: './day18-5.component.html'
})
export class Day18_5Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;

  private _instructions: iInstruction[];
  private _registersA: iRegister[];
  private _registersB: iRegister[];
  private _sendQueueA: number[];
  private _sendQueueB: number[];
  private _continue: boolean;
  private _positionA: number;
  private _positionB: number;
  private _sendCountB: number;
  private _waitingA: boolean;
  private _waitingB: boolean;

  ngOnInit() {
  }

  public calculate(): void {
    const rowsString = this.inputString.split("\n");
    this._instructions = new Array<iInstruction>();
    this._registersA = new Array<iRegister>();
    this._registersB = new Array<iRegister>();
    this._sendQueueA = new Array<number>();
    this._sendQueueB = new Array<number>();

    for (let i = 0; i < 16; i++) {
      let newRegisterA = <iRegister>{
        name: String.fromCharCode(i + 97),
        value: 0
      };

      let newRegisterB = <iRegister>{
        name: String.fromCharCode(i + 97),
        value: 0
      };

      this._registersA.push(newRegisterA);
      this._registersB.push(newRegisterB);
    }

    this._registersB[15].value = 1;

    rowsString.forEach((line) => {
      let lineSplit = line.split(" ");
      let newInstruction = <iInstruction>{
        command: lineSplit[0] == "snd"
          ? Command.send
          : lineSplit[0] == "set"
            ? Command.set
            : lineSplit[0] == "add"
              ? Command.add
              : lineSplit[0] == "mul"
                ? Command.multiply
                : lineSplit[0] == "mod"
                  ? Command.modulus
                  : lineSplit[0] == "rcv"
                    ? Command.receive
                    : Command.jump,
        v1: lineSplit[1],
        v2: lineSplit[2]
      };

      this._instructions.push(newInstruction);
    })

    this._continue = true;
    this._positionA = 0;
    this._positionB = 0;
    this._sendCountB = 0;
    this._waitingA = false;
    this._waitingB = false;

    while (!this._waitingA || !this._waitingB) {
      this._runInstruction();
    }

    this.answer = this._sendCountB;
  }

  private _runInstruction(): void {
    if (this._positionA < this._instructions.length &&
        this._positionA > -1) {
      if (this._instructions[this._positionA].command === Command.add) {
        this._addA();
      } else if (this._instructions[this._positionA].command === Command.jump) {
        this._jumpA();
      } else if (this._instructions[this._positionA].command === Command.modulus) {
        this._modulusA();
      } else if (this._instructions[this._positionA].command === Command.multiply) {
        this._multiplyA();
      } else if (this._instructions[this._positionA].command === Command.receive) {
        this._receiveA();
      } else if (this._instructions[this._positionA].command === Command.send) {
        this._sendA();
      } else if (this._instructions[this._positionA].command === Command.set) {
        this._setA();
      }
    } else {
      this._waitingA = true;
    }

    if (this._positionB < this._instructions.length &&
        this._positionB > -1) {
      if (this._instructions[this._positionB].command === Command.add) {
        this._addB();
      } else if (this._instructions[this._positionB].command === Command.jump) {
        this._jumpB();
      } else if (this._instructions[this._positionB].command === Command.modulus) {
        this._modulusB();
      } else if (this._instructions[this._positionB].command === Command.multiply) {
        this._multiplyB();
      } else if (this._instructions[this._positionB].command === Command.receive) {
        this._receiveB();
      } else if (this._instructions[this._positionB].command === Command.send) {
        this._sendB();
      } else if (this._instructions[this._positionB].command === Command.set) {
        this._setB();
      }
    } else {
      this._waitingB = true;
    }
  }

  private _addA(): void {
    if (isNaN(Number.parseInt(this._instructions[this._positionA].v2))) {
      this._registersA[this._instructions[this._positionA].v1.charCodeAt(0) - 97].value += this._registersA[this._instructions[this._positionA].v2.charCodeAt(0) - 97].value;
    } else {
      this._registersA[this._instructions[this._positionA].v1.charCodeAt(0) - 97].value += Number.parseInt(this._instructions[this._positionA].v2);
    }

    this._positionA++;
  }

  private _jumpA(): void {
    if (isNaN(Number.parseInt(this._instructions[this._positionA].v2))) {
      if (this._registersA[this._instructions[this._positionA].v1.charCodeAt(0) - 97].value > 0) {        
        this._positionA += this._registersA[this._instructions[this._positionA].v2.charCodeAt(0) - 97].value;
      } else {
        this._positionA++;
      }
    } else {
      if (isNaN(Number.parseInt(this._instructions[this._positionA].v1))) {
        if (this._registersA[this._instructions[this._positionA].v1.charCodeAt(0) - 97].value > 0) {
          this._positionA += Number.parseInt(this._instructions[this._positionA].v2);
        } else {
          this._positionA++;
        }
      } else {
          this._positionA += Number.parseInt(this._instructions[this._positionA].v2);
      }
    }
  }

  private _modulusA(): void {
    if (isNaN(Number.parseInt(this._instructions[this._positionA].v2))) {
      this._registersA[this._instructions[this._positionA].v1.charCodeAt(0) - 97].value = this._registersA[this._instructions[this._positionA].v1.charCodeAt(0) - 97].value % this._registersA[this._instructions[this._positionA].v2.charCodeAt(0) - 97].value;
    } else {
      this._registersA[this._instructions[this._positionA].v1.charCodeAt(0) - 97].value = this._registersA[this._instructions[this._positionA].v1.charCodeAt(0) - 97].value % Number.parseInt(this._instructions[this._positionA].v2);
    }

    this._positionA++;
  }

  private _multiplyA(): void {
    this._registersA[this._instructions[this._positionA].v1.charCodeAt(0) - 97].value *= Number.parseInt(this._instructions[this._positionA].v2);

    this._positionA++;
  }

  private _receiveA(): void {
    if (this._sendQueueB.length > 0) {
      this._registersA[this._instructions[this._positionA].v1.charCodeAt(0) - 97].value = this._sendQueueB[0];
      
      this._sendQueueB.shift();
      this._waitingA = false;
      this._positionA++;
    } else {
      this._waitingA = true;
    }
  }

  private _sendA(): void {
    this._sendQueueA.push(this._registersA[this._instructions[this._positionA].v1.charCodeAt(0) - 97].value);
    this._positionA++;
    this._waitingB = false;
  }

  private _setA(): void {
    if (isNaN(Number.parseInt(this._instructions[this._positionA].v2))) {
      this._registersA[this._instructions[this._positionA].v1.charCodeAt(0) - 97].value = this._registersA[this._instructions[this._positionA].v2.charCodeAt(0) - 97].value;
    } else {
      this._registersA[this._instructions[this._positionA].v1.charCodeAt(0) - 97].value = Number.parseInt(this._instructions[this._positionA].v2);
    }

    this._positionA++;
  }

  private _addB(): void {
    if (isNaN(Number.parseInt(this._instructions[this._positionB].v2))) {
      this._registersB[this._instructions[this._positionB].v1.charCodeAt(0) - 97].value += this._registersB[this._instructions[this._positionB].v2.charCodeAt(0) - 97].value;
    } else {
      this._registersB[this._instructions[this._positionB].v1.charCodeAt(0) - 97].value += Number.parseInt(this._instructions[this._positionB].v2);
    }

    this._positionB++;
  }

  private _jumpB(): void {
    if (isNaN(Number.parseInt(this._instructions[this._positionB].v2))) {
      if (this._registersB[this._instructions[this._positionB].v1.charCodeAt(0) - 97].value > 0) {
      this._positionB += this._registersB[this._instructions[this._positionB].v2.charCodeAt(0) - 97].value;
      } else {
        this._positionB++;
      }
    } else {
      if (isNaN(Number.parseInt(this._instructions[this._positionB].v1))) {
        if (this._registersB[this._instructions[this._positionB].v1.charCodeAt(0) - 97].value > 0) {
          this._positionB += Number.parseInt(this._instructions[this._positionB].v2);
        } else {
          this._positionB++;
        }
      } else {
          this._positionB += Number.parseInt(this._instructions[this._positionB].v2);
      }
    }
  }

  private _modulusB(): void {
    if (isNaN(Number.parseInt(this._instructions[this._positionB].v2))) {
      this._registersB[this._instructions[this._positionB].v1.charCodeAt(0) - 97].value = this._registersB[this._instructions[this._positionB].v1.charCodeAt(0) - 97].value % this._registersB[this._instructions[this._positionB].v2.charCodeAt(0) - 97].value;
    } else {
      this._registersB[this._instructions[this._positionB].v1.charCodeAt(0) - 97].value = this._registersB[this._instructions[this._positionB].v1.charCodeAt(0) - 97].value % Number.parseInt(this._instructions[this._positionB].v2);
    }

    this._positionB++;
  }

  private _multiplyB(): void {
    this._registersB[this._instructions[this._positionB].v1.charCodeAt(0) - 97].value *= Number.parseInt(this._instructions[this._positionB].v2);

    this._positionB++;
  }

  private _receiveB(): void {
    if (this._sendQueueA.length > 0) {
      this._registersB[this._instructions[this._positionB].v1.charCodeAt(0) - 97].value = this._sendQueueA[0];
      
      this._sendQueueA.shift();
      this._waitingB = false;
      this._positionB++;
    } else {
      this._waitingB = true;
    }
  }

  private _sendB(): void {
    this._sendQueueB.push(this._registersB[this._instructions[this._positionB].v1.charCodeAt(0) - 97].value);
    this._positionB++;
    this._sendCountB++;    
    this._waitingA = false;
  }

  private _setB(): void {
    if (isNaN(Number.parseInt(this._instructions[this._positionB].v2))) {
      this._registersB[this._instructions[this._positionB].v1.charCodeAt(0) - 97].value = this._registersB[this._instructions[this._positionB].v2.charCodeAt(0) - 97].value;
    } else {
      this._registersB[this._instructions[this._positionB].v1.charCodeAt(0) - 97].value = Number.parseInt(this._instructions[this._positionB].v2);
    }
    this._positionB++;
  }
}

interface iInstruction {
  command: Command,
  v1: string,
  v2: string
}

interface iRegister {
  name: string,
  value: number
}

enum Command {
  send,
  set,
  add,
  multiply,
  modulus,
  receive,
  jump
}