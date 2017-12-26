import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day23-5',
  templateUrl: './day23-5.component.html'
})
export class Day23_5Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;
  public finished: string;
  public position: number;

  private _instructions: iInstruction[];
  private _registers: iRegister[];
  private _position: number;
  
  ngOnInit() {
  }

  public calculate(): void {
    const rowsString = this.inputString.split("\n");
    this._instructions = new Array<iInstruction>();
    this._registers = new Array<iRegister>();

    for (let i = 0; i < 8; i++) {
      let newRegister = <iRegister> {
        name: String.fromCharCode(i+97),
        value: 0        
      };

      this._registers.push(newRegister);
    }

    this._registers[0].value = 1;

    rowsString.forEach((line) => {
      let lineSplit = line.split(" ");
      let newInstruction = <iInstruction> {
        command: lineSplit[0] == "set"
                  ? Command.set
                  : lineSplit[0] == "sub"
                    ? Command.sub
                    : lineSplit[0] == "mul"
                      ? Command.multiply
                      : Command.jump,
        v1:lineSplit[1],
        v2:lineSplit[2]
      };

      this._instructions.push(newInstruction);
    })

    this._position = 0;

    let b = 100000 + (Number.parseInt(this._instructions[0].v2) * Number.parseInt(this._instructions[4].v2));
    let c = b - Number.parseInt(this._instructions[7].v2);
    let h = 0;
    let iteration = Math.abs(Number.parseInt(this._instructions[7].v2)) / 1000;

    for (let i = b; i < (c+1); i+=iteration) {
      if (!this._isPrime(i)) {
        h += 1;
      }
    }

    this.answer = h;
  }

  private _isPrime(value: number) {
      for(var i = 2; i < value; i++) {
          if(value % i === 0) {
              return false;
          }
      }
      return value > 1;  
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
  set,
  sub,
  multiply,
  jump
}