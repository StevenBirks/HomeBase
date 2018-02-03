import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day8',
  templateUrl: './day8.component.html'
})
export class Day8Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;

  private _registers: iRegister[];
  private _instructions: iInstruction[]
  
  ngOnInit() {
  }

  public calculate(): void {
    var rowsString = this.inputString.split("\n");
    this._registers = new Array<iRegister>();
    this._instructions = new Array<iInstruction>();
    
    for (const row of rowsString) {
      const strArray = row.split(" ");
      
      const newRegister = <iRegister> {
        name: strArray[0],
        value: 0
      }

      if (this._registers.filter((register) => {
        return register.name === newRegister.name;
      }).length === 0) {
        this._registers.push(newRegister);
      }

      const newInstruction = <iInstruction> {
        register: strArray[0],
        action: strArray[1],
        actionValue: Number.parseInt(strArray[2]),
        evalOnRegister: strArray[4],
        operator: strArray[5],
        evalOnValue: Number.parseInt(strArray[6])
      }

      this._instructions.push(newInstruction);
    }

    this._instructions.forEach((instruction) => {
      if (instruction.operator == '==') {
        if (this._getRegisterValue(instruction.evalOnRegister) == instruction.evalOnValue) {
          instruction.action == 'inc'
            ? this._updateRegister(instruction.register, instruction.actionValue)
            : this._updateRegister(instruction.register, instruction.actionValue * -1);
        }
      } else if (instruction.operator == '>=') {
        if (this._getRegisterValue(instruction.evalOnRegister) >= instruction.evalOnValue) {
          instruction.action == 'inc'
            ? this._updateRegister(instruction.register, instruction.actionValue)
            : this._updateRegister(instruction.register, instruction.actionValue * -1);
        }
      } else if (instruction.operator == '<=') {
        if (this._getRegisterValue(instruction.evalOnRegister) <= instruction.evalOnValue) {
          instruction.action == 'inc'
            ? this._updateRegister(instruction.register, instruction.actionValue)
            : this._updateRegister(instruction.register, instruction.actionValue * -1);
        }
      } else if (instruction.operator == '!=') {
        if (this._getRegisterValue(instruction.evalOnRegister) != instruction.evalOnValue) {
          instruction.action == 'inc'
            ? this._updateRegister(instruction.register, instruction.actionValue)
            : this._updateRegister(instruction.register, instruction.actionValue * -1);
        }
      } else if (instruction.operator == '>') {
        if (this._getRegisterValue(instruction.evalOnRegister) > instruction.evalOnValue) {
          instruction.action == 'inc'
            ? this._updateRegister(instruction.register, instruction.actionValue)
            : this._updateRegister(instruction.register, instruction.actionValue * -1);
        }
      } else if (instruction.operator == '<') {
        if (this._getRegisterValue(instruction.evalOnRegister) < instruction.evalOnValue) {
          instruction.action == 'inc'
            ? this._updateRegister(instruction.register, instruction.actionValue)
            : this._updateRegister(instruction.register, instruction.actionValue * -1);
        }
      } else {
        alert(`ahhhhh: ${instruction.operator}`);
      }
    });

    const registerValues = new Array<number>();

    this._registers.forEach((register) => {
      registerValues.push(register.value);
    });

    const max = registerValues.reduce((a:number, b:number) => {
      return Math.max(a, b);
    });

    this.answer = max;
  } 

  private _getRegisterValue(registerName: string): number {
    return this._registers.find((register) => {
      return register.name === registerName;
    }).value;
  }

  private _updateRegister(registerName: string, updateValue: number) {
    let register = this._registers.find((register) => {
      return register.name === registerName;
    });

    const registerIndex = this._registers.indexOf(register);

    register.value += updateValue;

    this._registers[registerIndex] = register;
  }
}

interface iRegister {
  name: string,
  value: number
}

interface iInstruction {
  register: string,
  action: string,
  actionValue: number,
  evalOnRegister: string,
  operator: string,
  evalOnValue: number
}

