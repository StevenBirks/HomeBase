import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day19-5',
  templateUrl: './day19-5.component.html'
})
export class Day19_5_2018Component implements OnInit {
  _currentRegister: number;
  _instructionPointer: number;

  constructor() { }

  public inputString: string;
  public answer: number;

  private _registers: number[];
  private _instructions: iInstruction[];
  private _iteration: number;

  ngOnInit() {
  }

  public calculate(): void {
    this.init();
    this.run();

  }

  private init() {
    this._registers = new Array<number>();
    this._registers.push(1);
    this._registers.push(0);
    this._registers.push(0);
    this._registers.push(0);
    this._registers.push(0);
    this._registers.push(0);
    this._instructions = new Array<iInstruction>();
    this._instructionPointer = 0;
    this._iteration = 0;

    const inputSplit = this.inputString.split("\n");

    for (let i = 0; i < inputSplit.length; i++) {
      if (i === 0) {
        this._currentRegister = Number.parseInt(inputSplit[i].split(" ")[1], 10);
      } else {
        const split = inputSplit[i].split(" ");
        let newInstruction = <iInstruction>{
          opCode: split[0],
          val1: Number.parseInt(split[1], 10),
          val2: Number.parseInt(split[2], 10),
          regResult: Number.parseInt(split[3], 10)
        }

        this._instructions.push(newInstruction);
      }
    }
  }

  private run() {
    this._iteration++;
    this._registers[this._currentRegister] = this._instructionPointer;
    this.execOp(this._instructions[this._instructionPointer]);
    this._instructionPointer = this._registers[this._currentRegister];
    this._instructionPointer++;

    if (this._instructionPointer < this._instructions.length) {
      if (this._iteration % 5000 === 0) {
        if (this._iteration % 1000000 === 0) {
          console.log(this._iteration);
        }
        window.setTimeout(() => {
          this.answer = -1 * this._registers[0];
          this.run();

        }, 1);
      } else {
        this.run();
      }
    }
    else {
      this.answer = this._registers[0];
    }
  };

  private execOp(inst: iInstruction) {
    if (inst.opCode === "addr") {
      this.addr(inst.val1, inst.val2, inst.regResult);
    } else if (inst.opCode === "addi") {
      this.addi(inst.val1, inst.val2, inst.regResult);
    } else if (inst.opCode === "mulr") {
      this.mulr(inst.val1, inst.val2, inst.regResult);
    } else if (inst.opCode === "muli") {
      this.muli(inst.val1, inst.val2, inst.regResult);
    } else if (inst.opCode === "banr") {
      this.banr(inst.val1, inst.val2, inst.regResult);
    } else if (inst.opCode === "bani") {
      this.bani(inst.val1, inst.val2, inst.regResult);
    } else if (inst.opCode === "borr") {
      this.borr(inst.val1, inst.val2, inst.regResult);
    } else if (inst.opCode === "bori") {
      this.bori(inst.val1, inst.val2, inst.regResult);
    } else if (inst.opCode === "setr") {
      this.setr(inst.val1, inst.regResult);
    } else if (inst.opCode === "seti") {
      this.seti(inst.val1, inst.regResult);
    } else if (inst.opCode === "gtir") {
      this.gtir(inst.val1, inst.val2, inst.regResult);
    } else if (inst.opCode === "gtri") {
      this.gtri(inst.val1, inst.val2, inst.regResult);
    } else if (inst.opCode === "gtrr") {
      this.gtrr(inst.val1, inst.val2, inst.regResult);
    } else if (inst.opCode === "eqir") {
      this.eqir(inst.val1, inst.val2, inst.regResult);
    } else if (inst.opCode === "eqri") {
      this.eqri(inst.val1, inst.val2, inst.regResult);
    } else if (inst.opCode === "eqrr") {
      this.eqrr(inst.val1, inst.val2, inst.regResult);
    }
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

interface iInstruction {
  opCode: string,
  val1: number,
  val2: number,
  regResult: number
}
