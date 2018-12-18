import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-2018-day16',
  templateUrl: './day16.component.html'
})
export class Day16_2018Component implements OnInit {
  
  constructor() { }
  
  public inputString: string;
  public answer: number;
  
  private _registers: number[];
  private _matchingSampleCount: number;
  private _tests: iTest[];

  ngOnInit() {
  }

  public calculate(): void {
    this.init();

    this.iterateTests();

    this.answer = this._matchingSampleCount;
  }

  private init() {
    this._registers = new Array<number>();
    this._registers.push(0);
    this._registers.push(0);
    this._registers.push(0);
    this._registers.push(0);
    this._tests = new Array<iTest>();
    this._matchingSampleCount = 0;

    const inputSplit = this.inputString.split("\n");

    for (let i = 0; i < inputSplit.length; i += 4) {
      let beforeArray = new Array<number>();
      inputSplit[i].split("[")[1].split("]")[0].split(", ").forEach((value) => {
        beforeArray.push(Number.parseInt(value));
      });

      let inputArray = new Array<number>();
      inputSplit[i + 1].split(" ").forEach((value) => {
        inputArray.push(Number.parseInt(value));
      });

      let afterArray = new Array<number>();
      inputSplit[i + 2].split("[")[1].split("]")[0].split(", ").forEach((value) => {
        afterArray.push(Number.parseInt(value));
      });


      let newTest = <iTest>{
        before: beforeArray,
        input: inputArray,
        after: afterArray
      }

      this._tests.push(newTest);
    }
  }

  private iterateTests() {
    this._tests.forEach((test) => {
      this.iterateOpcodes(test);
    });
  }

  private iterateOpcodes(test: iTest) {
    let matchCount = 0;

    // addr
    this.setRegisters(test.before);
    this.addr(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // addi
    this.setRegisters(test.before);
    this.addi(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // mulr
    this.setRegisters(test.before);
    this.mulr(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // muli
    this.setRegisters(test.before);
    this.muli(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // banr
    this.setRegisters(test.before);
    this.banr(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // bani
    this.setRegisters(test.before);
    this.bani(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // borr
    this.setRegisters(test.before);
    this.borr(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // bori
    this.setRegisters(test.before);
    this.bori(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // setr
    this.setRegisters(test.before);
    this.setr(test.input[1], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // seti
    this.setRegisters(test.before);
    this.seti(test.input[1], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // gtir
    this.setRegisters(test.before);
    this.gtir(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // gtri
    this.setRegisters(test.before);
    this.gtri(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // gtrr
    this.setRegisters(test.before);
    this.gtrr(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // eqir
    this.setRegisters(test.before);
    this.eqir(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // eqri
    this.setRegisters(test.before);
    this.eqri(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    // eqrr
    this.setRegisters(test.before);
    this.eqrr(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matchCount++;
    }

    if (matchCount >= 3) {
      this._matchingSampleCount++;
    }
  }

  private setRegisters(values: number[]) {
    for (let i = 0; i < 4; i++) {
      this._registers[i] = values[i];
    }
  }

  private checkResult(expected: number[], actual: number[]): boolean {
    for (let i = 0; i < 4; i++) {
      if (expected[i] !== actual[i]) {
        return false;
      }
    }

    return true;
  }

  private addr(register1: number, register2: number, registerResult: number) {
    this._registers[registerResult] = this._registers[register1] + this._registers[register2];
  }

  private addi(register: number, value: number, registerResult: number) {
    this._registers[registerResult] = this._registers[register] + value;
  }

  private mulr(register1: number, register2: number, registerResult: number) {
    this._registers[registerResult] = this._registers[register1] * this._registers[register2];
  }

  private muli(register: number, value: number, registerResult: number) {
    this._registers[registerResult] = this._registers[register] * value;
  }

  private banr(register1: number, register2: number, registerResult: number) {
    this._registers[registerResult] = this._registers[register1] & this._registers[register2];
  }

  private bani(register: number, value: number, registerResult: number) {
    this._registers[registerResult] = this._registers[register] & value;
  }

  private borr(register1: number, register2: number, registerResult: number) {
    this._registers[registerResult] = this._registers[register1] | this._registers[register2];
  }

  private bori(register: number, value: number, registerResult: number) {
    this._registers[registerResult] = this._registers[register] | value;
  }

  private setr(register: number, registerResult: number) {
    this._registers[registerResult] = this._registers[register];
  }

  private seti(value: number, registerResult: number) {
    this._registers[registerResult] = value;
  }

  private gtir(value: number, register: number, registerResult: number) {
    this._registers[registerResult] = value > this._registers[register] ? 1 : 0;
  }

  private gtri(register: number, value: number, registerResult: number) {
    this._registers[registerResult] = this._registers[register] > value ? 1 : 0;
  }

  private gtrr(register1: number, register2: number, registerResult: number) {
    this._registers[registerResult] = this._registers[register1] > this._registers[register2] ? 1 : 0;
  }

  private eqir(value: number, register: number, registerResult: number) {
    this._registers[registerResult] = value === this._registers[register] ? 1 : 0;
  }

  private eqri(register: number, value: number, registerResult: number) {
    this._registers[registerResult] = this._registers[register] === value ? 1 : 0;
  }

  private eqrr(register1: number, register2: number, registerResult: number) {
    this._registers[registerResult] = this._registers[register1] === this._registers[register2] ? 1 : 0;
  }

}

interface iTest {
  before: number[],
  input: number[],
  after: number[]
}
