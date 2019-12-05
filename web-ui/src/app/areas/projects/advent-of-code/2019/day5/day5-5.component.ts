import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2019-day5-5',
  templateUrl: './day5-5.component.html'
})
export class Day5_5_2019Component implements OnInit {


  constructor() { }

  public inputString: string;
  public answer: string

  private _values: number[];
  private _position: number;

  private _output: number;
  private _input: number;
  private _pointerIncrement: number;
  private _badCount: number;
  private _updatePointer: boolean;

  ngOnInit() {
  }

  public calculate(): void {
    this._values = new Array<number>();
    this.inputString.split(",").forEach((value) => {
      this._values.push(Number.parseInt(value));
    });

    let itt = 1;

    this._input = 5;

    this._position = 0;
    this._badCount = 0;
    this._output = 0;

    while (this._values[this._position] !== 99) {
      this.calculateNext();
      itt++;

      this._badCount += this._output;

      if (this._updatePointer) {
        this._position += this._pointerIncrement;
      } else {
        this._position = this._values[this._position];
      }
    }

    this.answer = `output: ${this._output}`;
  }

  private calculateNext() {
    this._updatePointer = true;
    const inst = this.getInstruction(this._values[this._position]);
    this.setPointerIncrement(inst);
    const modes = this.getModes(this._values[this._position]);

    if (inst === instruction.add) {
      this.actionAdd(modes);
    } else if (inst === instruction.multiply) {
      this.actionMultiply(modes);
    } else if (inst === instruction.input) {
      this.actionInput(modes);
    } else if (inst === instruction.output) {
      this.actionOutput(modes);
    } else if (inst === instruction.jumpIfTrue) {
      this.actionJumpIfTrue(modes);
    } else if (inst === instruction.jumpIfFalse) {
      this.actionJumpIfFalse(modes);
    } else if (inst === instruction.lessThan) {
      this.actionLessThan(modes);
    } else if (inst === instruction.equals) {
      this.actionEquals(modes);
    } else {
      this._values[this._position + 4] = 99;
    }
  }

  private actionAdd(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    const val2 = this.getValue(modes[1], 2);

    if (modes[2] === paramMode.position) {
      this._values[this._values[this._position + 3]] = val1 + val2;
    } else {
      console.log("BAD");
      this._values[this._position + 3] = val1 + val2;
    }
  }

  private actionMultiply(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    const val2 = this.getValue(modes[1], 2);

    if (modes[2] === paramMode.position) {
      this._values[this._values[this._position + 3]] = val1 * val2;
    } else {
      console.log("BAD");
      this._values[this._position + 3] = val1 * val2;
    }
  }

  private actionInput(modes: paramMode[]) {
    if (modes[0] === paramMode.position) {
      this._values[this._values[this._position + 1]] = this._input;
    } else {
      console.log("BAD??");
      this._values[this._position + 1] = this._input;
    }
  }

  private actionOutput(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    this._output = val1;
  }

  private actionJumpIfTrue(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    const val2 = this.getValue(modes[1], 2);

    if (val1 !== 0) {
      this._values[this._position] = val2;
      this._updatePointer = false;
    }
  }

  private actionJumpIfFalse(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    const val2 = this.getValue(modes[1], 2);

    if (val1 === 0) {
      this._values[this._position] = val2;
      this._updatePointer = false;
    }
  }

  private actionLessThan(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    const val2 = this.getValue(modes[1], 2);

    let valToStore = 0;

    if (val1 < val2) {
      valToStore = 1;
    }

    this._values[this._values[this._position + 3]] = valToStore;
  }

  private actionEquals(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    const val2 = this.getValue(modes[1], 2);

    let valToStore = 0;

    if (val1 === val2) {
      valToStore = 1;
    }

    this._values[this._values[this._position + 3]] = valToStore;
  }

  private getValue(mode: paramMode, posOffset: number): number {
    return mode === paramMode.position
      ? this._values[this._values[this._position + posOffset]]
      : this._values[this._position + posOffset];
  }

  private getModes(value: number): paramMode[] {
    let paramModes = new Array<paramMode>();

    const valArray = value.toString().split("").reverse();

    const firstMode = valArray[2] === "0"
      ? paramMode.position
      : valArray[2] === "1"
        ? paramMode.immediate
        : paramMode.position

    paramModes.push(firstMode);

    const secondMode = valArray[3] === "0"
      ? paramMode.position
      : valArray[3] === "1"
        ? paramMode.immediate
        : paramMode.position

    paramModes.push(secondMode);

    const thirdMode = valArray[4] === "0"
      ? paramMode.position
      : valArray[4] === "1"
        ? paramMode.immediate
        : paramMode.position

    paramModes.push(thirdMode);

    return paramModes;
  }

  private getInstruction(value: number): instruction {
    const valArray = value.toString().split("");
    const valSingle = valArray[valArray.length - 1];
    const opCode = Number.parseInt(valSingle);

    switch (opCode) {
      case 1:
        return instruction.add;
      case 2:
        return instruction.multiply;
      case 3:
        return instruction.input;
      case 4:
        return instruction.output;
      case 5:
        return instruction.jumpIfTrue;
      case 6:
        return instruction.jumpIfFalse;
      case 7:
        return instruction.lessThan;
      case 8:
        return instruction.equals;
      case 9:
        return instruction.end;
      default:
        console.log("error instruction attempt: ", value);
        return instruction.end
    }
  }

  private setPointerIncrement(inst: instruction) {
    if (this._updatePointer) {
      switch (inst) {
        case instruction.add:
        case instruction.multiply:
        case instruction.lessThan:
        case instruction.equals:
          this._pointerIncrement = 4;
          break;
        case instruction.jumpIfFalse:
        case instruction.jumpIfTrue:
          this._pointerIncrement = 3;
          break;
        case instruction.input:
        case instruction.output:
          this._pointerIncrement = 2;
          break;
        case instruction.end:
          this._pointerIncrement = 0;
          break;
      }
    }
  }
}

enum instruction {
  add,
  multiply,
  input,
  output,
  jumpIfTrue,
  jumpIfFalse,
  lessThan,
  equals,
  end
}

enum paramMode {
  position,
  immediate
}
