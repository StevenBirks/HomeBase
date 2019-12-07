import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2019-day7',
  templateUrl: './day7.component.html'
})
export class Day7_2019Component implements OnInit {
  constructor() { }

  public inputString: string;
  public answer: number;

  private _usedValues: Array<number>;
  private _phaseSettings: number[];
  private _phaseSettingIterations: number[][];

  private _values: number[];
  private _position: number;
  private _phaseInput: number;
  private _phaseOutput: number;
  private _maxValueOutput: number;
  private _maxValueOutputIteration: number[];

  private _input: number;
  private _pointerIncrement: number;
  private _updatePointer: boolean;

  ngOnInit() {
    this._phaseSettings = [0,1,2,3,4];
  };

  public calculate(): void {
    this._usedValues = new Array<number>();
    this._phaseSettingIterations = new Array<Array<number>>();
    this._maxValueOutput = 0;

    this.PermutePhases(this._phaseSettings);

    for (let i = 0; i < this._phaseSettingIterations.length; i++) {
      this._phaseInput = 0;
      this._phaseOutput = 0;

      this._phaseSettingIterations[i].forEach((phase) => {
        this._input = phase;
        this.calculateWithIntCodeComp();
        this._phaseInput = this._phaseOutput;
      });

      console.log(i);
      this.calculateMax(this._phaseSettingIterations[i]);
    }

    this.answer = this._maxValueOutput;
  }

  private calculateMax(iteration: number[]) {
    if (this._phaseOutput > this._maxValueOutput) {
      console.log("outputphase: ", this._phaseOutput);
      console.log("iteration: ", iteration);

      this._maxValueOutput = this._phaseOutput;
      this._maxValueOutputIteration = iteration;
    }
  }

  private PermutePhases(input: number[]) {
    for (let i = 0; i < input.length; i++) {
      let value = input.splice(i, 1)[0];
      this._usedValues.push(value);
      if (input.length == 0) {
        this._phaseSettingIterations.push(this._usedValues.slice());
      }

      this.PermutePhases(input);
      input.splice(i, 0, value);
      this._usedValues.pop();
    }
  };

  private calculateWithIntCodeComp(): void {
    this._values = new Array<number>();
    this.inputString.split(",").forEach((value) => {
      this._values.push(Number.parseInt(value));
    });

    let itt = 1;

    this._position = 0;

    while (this._values[this._position] !== 99) {
      this.calculateNext();
      itt++;

      if (this._updatePointer) {
        this._position += this._pointerIncrement;
      } else {
        this._position = this._values[this._position];
      }
    }
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
      this._input = this._phaseInput;
    } else {
      console.log("BAD??");
      this._values[this._position + 1] = this._input;
    }
  }

  private actionOutput(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    debugger;
    this._phaseOutput = val1;
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
