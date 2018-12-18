import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day16-5',
  templateUrl: './day16-5.component.html'
})
export class Day16_5_2018Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number;

  private _registers: number[];
  private _tests: iTest[];
  private _progLines: number[][];

  private _opcodes: iOpcode[];

  ngOnInit() {
  }

  public calculate(): void {
    this.init();

    this.iterateTests();

    this.run();

    this.answer = this._registers[0];
  }

  private init() {
    this._registers = new Array<number>();
    this._registers.push(0);
    this._registers.push(0);
    this._registers.push(0);
    this._registers.push(0);
    this._tests = new Array<iTest>();
    this._opcodes = new Array<iOpcode>();
    this._progLines = new Array<Array<number>>();

    const inputSplit = this.inputString.split("\n");

    for (let i = 0; i < inputSplit.length; i++) {
      let typeValue = "tests";

      if (inputSplit[i].split("").length === 0 || inputSplit[i].split("")[0] !== "B") {
        typeValue = "prog";
      }

      if (typeValue === "tests") {
        console.log(inputSplit[i]);
        console.log(inputSplit[i].split("").length);
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
        i += 3;
      } else {
        if (inputSplit[i].length > 0) {
          const nums = new Array<number>();

          inputSplit[i].split(" ").forEach((val) => {
            nums.push(Number.parseInt(val, 10));
          });

          this._progLines.push(nums);
        }
      }
    }

    console.log(this._progLines);
  }

  private run() {
    this.setRegisters([0,0,0,0]);

    this._progLines.forEach((line) => {
      const opcode = this._opcodes.find((code) => {
        return code.ref === line[0];
      }).op;

      this.execOp(opcode, line);
    })
  };

  private execOp(opcode: string, line: number[]) {
    if (opcode === "addr") {
      this.addr(line[1], line[2], line[3]);
    } else if (opcode === "addi") {
      this.addi(line[1], line[2], line[3]);
    } else if (opcode === "mulr") {
      this.mulr(line[1], line[2], line[3]);
    } else if (opcode === "muli") {
      this.muli(line[1], line[2], line[3]);
    } else if (opcode === "banr") {
      this.banr(line[1], line[2], line[3]);
    } else if (opcode === "bani") {
      this.bani(line[1], line[2], line[3]);
    } else if (opcode === "borr") {
      this.borr(line[1], line[2], line[3]);
    } else if (opcode === "bori") {
      this.bori(line[1], line[2], line[3]);
    } else if (opcode === "setr") {
      this.setr(line[1], line[3]);
    } else if (opcode === "seti") {
      this.seti(line[1], line[3]);
    } else if (opcode === "gtir") {
      this.gtir(line[1], line[2], line[3]);
    } else if (opcode === "gtri") {
      this.gtri(line[1], line[2], line[3]);
    } else if (opcode === "gtrr") {
      this.gtrr(line[1], line[2], line[3]);
    } else if (opcode === "eqir") {
      this.eqir(line[1], line[2], line[3]);
    } else if (opcode === "eqri") {
      this.eqri(line[1], line[2], line[3]);
    } else if (opcode === "eqrr") {
      this.eqrr(line[1], line[2], line[3]);
    }
  }

  private iterateTests() {
    this._tests.forEach((test) => {
      this.iterateOpcodes(test);
    });

    console.log(this._opcodes);

    // if (this._opcodes.length < 16) {
    //   window.setTimeout(() => {
    //     this.answer = this._opcodes.length;
    //     this.iterateTests();
    //   }, 10)
    //}
  }

  private iterateOpcodes(test: iTest) {
    let matches = new Array<string>();

    // addr
    this.setRegisters(test.before);
    this.addr(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("addr");
    }

    // addi
    this.setRegisters(test.before);
    this.addi(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("addi");
    }

    // mulr
    this.setRegisters(test.before);
    this.mulr(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("mulr");
    }

    // muli
    this.setRegisters(test.before);
    this.muli(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("muli");
    }

    // banr
    this.setRegisters(test.before);
    this.banr(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("banr");
    }

    // bani
    this.setRegisters(test.before);
    this.bani(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("bani");
    }

    // borr
    this.setRegisters(test.before);
    this.borr(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("borr");
    }

    // bori
    this.setRegisters(test.before);
    this.bori(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("bori");
    }

    // setr
    this.setRegisters(test.before);
    this.setr(test.input[1], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("setr");
    }

    // seti
    this.setRegisters(test.before);
    this.seti(test.input[1], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("seti");
    }

    // gtir
    this.setRegisters(test.before);
    this.gtir(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("gtir");
    }

    // gtri
    this.setRegisters(test.before);
    this.gtri(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("gtri");
    }

    // gtrr
    this.setRegisters(test.before);
    this.gtrr(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("gtrr");
    }

    // eqir
    this.setRegisters(test.before);
    this.eqir(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("eqir");
    }

    // eqri
    this.setRegisters(test.before);
    this.eqri(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("eqri");
    }

    // eqrr
    this.setRegisters(test.before);
    this.eqrr(test.input[1], test.input[2], test.input[3]);

    if (this.checkResult(test.after, this._registers)) {
      matches.push("eqrr");
    }

    const opcodevals = this._opcodes.map((val) => val.op);
    const opcoderefs = this._opcodes.map((val) => val.ref);

    const resultingMatches = matches.filter((el) => !opcodevals.includes(el));
    if (resultingMatches.length === 1 && opcoderefs.find((ref) => { return ref === test.input[0] }) === undefined) {
      this._opcodes.push(<iOpcode>{
        ref: test.input[0],
        op: resultingMatches[0]
      });
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

interface iOpcode {
  ref: number,
  op: string
}
