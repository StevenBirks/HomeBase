import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day18',
  templateUrl: './day18.component.html'
})
export class Day18Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;

  private _instructions: iInstruction[];
  private _registers: iRegister[];
  private _continue: boolean;
  private _position: number;
  private _lastSoundPlayed: number;
  
  ngOnInit() {
  }

  public calculate(): void {
    const rowsString = this.inputString.split("\n");
    this._instructions = new Array<iInstruction>();
    this._registers = new Array<iRegister>();

    for (let i = 0; i < 16; i++) {
      let newRegister = <iRegister> {
        name: String.fromCharCode(i+97),
        value: 0        
      };

      this._registers.push(newRegister);
    }

    rowsString.forEach((line) => {
      let lineSplit = line.split(" ");
      let newInstruction = <iInstruction> {
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
        v1:lineSplit[1],
        v2:lineSplit[2]
      };

      this._instructions.push(newInstruction);
    })

    this._continue = true;
    this._position = 0;

    while (this._continue) {
      this._runInstruction();
    }
  }

  private _runInstruction(): void {
    if (this._instructions[this._position].command === Command.add) {
      this._add();
    } else if (this._instructions[this._position].command === Command.jump) {
      this._jump();
    } else if (this._instructions[this._position].command === Command.modulus) {
      this._modulus();
    } else if (this._instructions[this._position].command === Command.multiply) {
      this._multiply();
    } else if (this._instructions[this._position].command === Command.receive) {
      this._receive();
    } else if (this._instructions[this._position].command === Command.send) {
      this._send();
    } else if (this._instructions[this._position].command === Command.set) {
      this._set();
    }
  }

  private _add(): void {
    this._registers[this._instructions[this._position].v1.charCodeAt(0)-97].value += Number.parseInt(this._instructions[this._position].v2);
    this._position++;
  }

  private _jump(): void {
    if (this._registers[this._instructions[this._position].v1.charCodeAt(0)-97].value > 0) {
      this._position += Number.parseInt(this._instructions[this._position].v2);

    } else {
      this._position++;
    }
  }

  private _modulus(): void {
    if (isNaN(Number.parseInt(this._instructions[this._position].v2))) {
      this._registers[this._instructions[this._position].v1.charCodeAt(0)-97].value = this._registers[this._instructions[this._position].v1.charCodeAt(0)-97].value % this._registers[this._instructions[this._position].v2.charCodeAt(0)-97].value;
    } else {      
      this._registers[this._instructions[this._position].v1.charCodeAt(0)-97].value = this._registers[this._instructions[this._position].v1.charCodeAt(0)-97].value % Number.parseInt(this._instructions[this._position].v2);
    }
    
    this._position++;
  }

  private _multiply(): void {
    this._registers[this._instructions[this._position].v1.charCodeAt(0)-97].value *= Number.parseInt(this._instructions[this._position].v2);    
    this._position++;
  }

  private _receive(): void {
    if (this._registers[this._instructions[this._position].v1.charCodeAt(0)-97].value > 0) {
      this.answer = this._lastSoundPlayed;
      this._continue = false;
    } else {
      this._position++;
    }
  }

  private _send(): void {
    this._lastSoundPlayed = this._registers[this._instructions[this._position].v1.charCodeAt(0)-97].value;
    this._position++;
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
  send,
  set,
  add,
  multiply,
  modulus,
  receive,
  jump
}