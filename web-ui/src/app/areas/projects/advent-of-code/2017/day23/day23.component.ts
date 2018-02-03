import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day23',
  templateUrl: './day23.component.html'
})
export class Day23Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;

  private _instructions: iInstruction[];
  private _registers: iRegister[];
  private _continue: boolean;
  private _position: number;
  private _mulCount: number;
  
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

    this._continue = true;
    this._position = 0;
    this._mulCount = 0;

    while (this._continue) {
      this._runInstruction();
    }

    this.answer = this._mulCount;
  }

  private _runInstruction(): void {
    if (this._instructions[this._position].command === Command.sub) {
      this._sub();
    } else if (this._instructions[this._position].command === Command.jump) {
      this._jump();
    } else if (this._instructions[this._position].command === Command.multiply) {
      this._multiply();
    } else if (this._instructions[this._position].command === Command.set) {
      this._set();
    }

    if (this._position >= this._instructions.length || this._position < 0) {
      this._continue = false;
    }
  }

  private _sub(): void {

    if (isNaN(Number.parseInt(this._instructions[this._position].v2))) {
      this._registers[this._instructions[this._position].v1.charCodeAt(0) - 97].value -= this._registers[this._instructions[this._position].v2.charCodeAt(0) - 97].value;
    } else {
      this._registers[this._instructions[this._position].v1.charCodeAt(0) - 97].value -= Number.parseInt(this._instructions[this._position].v2);
    }

    this._position++;
  }

  private _jump(): void {
    if (isNaN(Number.parseInt(this._instructions[this._position].v2))) {
      if (this._registers[this._instructions[this._position].v1.charCodeAt(0) - 97].value !== 0) {        
        this._position += this._registers[this._instructions[this._position].v2.charCodeAt(0) - 97].value;
      } else {
        this._position++;
      }
    } else {
      if (isNaN(Number.parseInt(this._instructions[this._position].v1))) {
        if (this._registers[this._instructions[this._position].v1.charCodeAt(0) - 97].value !== 0) {
          this._position += Number.parseInt(this._instructions[this._position].v2);
        } else {
          this._position++;
        }
      } else {
          this._position += Number.parseInt(this._instructions[this._position].v2);
      }
    }
  }

  private _multiply(): void {
    if (isNaN(Number.parseInt(this._instructions[this._position].v2))) {
      this._registers[this._instructions[this._position].v1.charCodeAt(0) - 97].value *= this._registers[this._instructions[this._position].v2.charCodeAt(0) - 97].value;
    } else {
      this._registers[this._instructions[this._position].v1.charCodeAt(0) - 97].value *= Number.parseInt(this._instructions[this._position].v2);
    }

    this._position++;
    this._mulCount++;
  }

  private _set(): void {
    if (isNaN(Number.parseInt(this._instructions[this._position].v2))) {
      this._registers[this._instructions[this._position].v1.charCodeAt(0)-97].value = this._registers[this._instructions[this._position].v2.charCodeAt(0)-97].value;      
    } else {
      this._registers[this._instructions[this._position].v1.charCodeAt(0)-97].value = Number.parseInt(this._instructions[this._position].v2);
    }
    
    this._position++;
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