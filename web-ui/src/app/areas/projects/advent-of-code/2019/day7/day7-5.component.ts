import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2019-day7-5',
  templateUrl: './day7-5.component.html'
})
export class Day7_5_2019Component implements OnInit {
  constructor() { }

  public inputString: string;
  public answer: number;

  private _usedValues: Array<number>;
  private _phaseSettings: number[];
  private _phaseSettingIterations: number[][];

  private _maxValueOutput: number;

  private _ampA: iAmp;
  private _ampB: iAmp;
  private _ampC: iAmp;
  private _ampD: iAmp;
  private _ampE: iAmp;

  private _forceMoveOn: boolean;

  private _currentAmp: iAmp;

  private _pointerIncrement: number;
  private _updatePointer: boolean;

  ngOnInit() {
    this._phaseSettings = [9, 8, 7, 6, 5];
    //this._phaseSettings = [9,7,8,5,6];
    //this._phaseSettings = [1, 0, 4, 3, 2];
    //this._phaseSettings = [4,3,2,1,0];
    //this._phaseSettings = [0,1,2,3,4];
  };

  public calculate(): void {
    this._usedValues = new Array<number>();
    this._phaseSettingIterations = new Array<Array<number>>();
    this._maxValueOutput = 0;

    this.PermutePhases(this._phaseSettings);

    for (let i = 0; i < this._phaseSettingIterations.length; i++) {
      this.initialiseAmps(this._phaseSettingIterations[i]);
      this._forceMoveOn = false;

      this._currentAmp = this._ampA;

      while (!this._ampE.stopped) {
        this.calculateWithIntCodeComp();
        this.calculateMax();
      }
    }
    this.answer = this._maxValueOutput;
  }

  private calculateMax() {
    const outputVal = this._ampE.outputs[this._ampE.outputs.length - 1]
    if (outputVal > this._maxValueOutput) {
      this._maxValueOutput = outputVal;
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
    while (this._currentAmp.values[this._currentAmp.position] !== 99) {
      this.calculateNext();

      if (this._forceMoveOn == true) {
        break;
      }

      if (this._updatePointer) {
        this._currentAmp.position += this._pointerIncrement;
      }
    }

    if (!this._forceMoveOn) {
      this._currentAmp.stopped = true;
    } else {
      this._forceMoveOn = false;
    }

    this._currentAmp = this._currentAmp.nextAmp;
  }

  private calculateNext() {
    this._updatePointer = true;
    const inst = this.getInstruction(this._currentAmp.values[this._currentAmp.position]);
    this.setPointerIncrement(inst);
    const modes = this.getModes(this._currentAmp.values[this._currentAmp.position]);

    switch (inst) {
      case instruction.add:
        this.actionAdd(modes);
        break;
      case instruction.multiply:
        this.actionMultiply(modes);
        break;
      case instruction.input:
        this.actionInput(modes);
        break;
      case instruction.output:
        this.actionOutput(modes);
        break;
      case instruction.jumpIfTrue:
        this.actionJumpIfTrue(modes);
        break;
      case instruction.jumpIfFalse:
        this.actionJumpIfFalse(modes);
        break;
      case instruction.lessThan:
        this.actionLessThan(modes);
        break;
      case instruction.equals:
        this.actionEquals(modes);
        break;
      default:
        //console.log("BAD");
        this._currentAmp.values[this._currentAmp.position + 4] = 99;
        break;
    }
  }

  private actionAdd(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    const val2 = this.getValue(modes[1], 2);


    if (modes[2] === paramMode.position) {
      this._currentAmp.values[this._currentAmp.values[this._currentAmp.position + 3]] = val1 + val2;
    } else {
      //console.log("BAD");
      this._currentAmp.values[this._currentAmp.position + 3] = val1 + val2;
    }
  }

  private actionMultiply(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    const val2 = this.getValue(modes[1], 2);

    if (modes[2] === paramMode.position) {
      this._currentAmp.values[this._currentAmp.values[this._currentAmp.position + 3]] = val1 * val2;
    } else {
      //console.log("BAD");
      this._currentAmp.values[this._currentAmp.position + 3] = val1 * val2;
    }
  }

  private actionInput(modes: paramMode[]) {
    if (modes[0] === paramMode.position) {
      if (this._currentAmp.inputs.length > 0) {
        this._currentAmp.values[this._currentAmp.values[this._currentAmp.position + 1]] = this._currentAmp.inputs[0];
        this._currentAmp.inputs.shift();
      } else if (this._currentAmp.previousAmp.outputs.length > 0) {
        this._currentAmp.values[this._currentAmp.values[this._currentAmp.position + 1]] = this._currentAmp.previousAmp.outputs[0];
        this._currentAmp.previousAmp.outputs.shift();
      } else {
        this._forceMoveOn = true;
      }
    } else {
      //console.log("BAD??");
    }
  }

  private actionOutput(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    this._currentAmp.outputs.push(val1);
  }

  private actionJumpIfTrue(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    const val2 = this.getValue(modes[1], 2);
    if (val1 !== 0) {
      this._currentAmp.position = val2;
      this._updatePointer = false;
    }
  }

  private actionJumpIfFalse(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    const val2 = this.getValue(modes[1], 2);

    if (val1 === 0) {
      this._currentAmp.position = val2;
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

    this._currentAmp.values[this._currentAmp.values[this._currentAmp.position + 3]] = valToStore;
  }

  private actionEquals(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    const val2 = this.getValue(modes[1], 2);

    let valToStore = 0;

    if (val1 === val2) {
      valToStore = 1;
    }

    this._currentAmp.values[this._currentAmp.values[this._currentAmp.position + 3]] = valToStore;
  }

  private getValue(mode: paramMode, posOffset: number): number {
    return mode === paramMode.position
      ? this._currentAmp.values[this._currentAmp.values[this._currentAmp.position + posOffset]]
      : this._currentAmp.values[this._currentAmp.position + posOffset];
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
    const valSingle = `${valArray[valArray.length - 2] != undefined ? valArray[valArray.length - 2] : ""}${valArray[valArray.length - 1]}`;
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
        debugger;
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

  private initialiseAmps(phases: number[]) {
    let valsA = new Array<number>();

    this.inputString.split(",").forEach((value) => {
      valsA.push(Number.parseInt(value));
    });

    this._ampA = {
      inputs: [phases[0], 0],
      outputs: new Array<number>(),
      position: 0,
      previousAmp: null,
      nextAmp: null,
      stopped: false,
      values: valsA,
      name: "A"
    } as iAmp;

    let valsB = new Array<number>();

    this.inputString.split(",").forEach((value) => {
      valsB.push(Number.parseInt(value));
    });

    this._ampB = {
      inputs: [phases[1]],
      outputs: new Array<number>(),
      position: 0,
      previousAmp: null,
      nextAmp: null,
      stopped: false,
      values: valsB,
      name: "B"
    } as iAmp;

    let valsC = new Array<number>();

    this.inputString.split(",").forEach((value) => {
      valsC.push(Number.parseInt(value));
    });

    this._ampC = {
      inputs: [phases[2]],
      outputs: new Array<number>(),
      position: 0,
      previousAmp: null,
      nextAmp: null,
      stopped: false,
      values: valsC,
      name: "C"
    } as iAmp;

    let valsD = new Array<number>();

    this.inputString.split(",").forEach((value) => {
      valsD.push(Number.parseInt(value));
    });

    this._ampD = {
      inputs: [phases[3]],
      outputs: new Array<number>(),
      position: 0,
      previousAmp: null,
      nextAmp: null,
      stopped: false,
      values: valsD,
      name: "D"
    } as iAmp;

    let valsE = new Array<number>();

    this.inputString.split(",").forEach((value) => {
      valsE.push(Number.parseInt(value));
    });

    this._ampE = {
      inputs: [phases[4]],
      outputs: new Array<number>(),
      position: 0,
      previousAmp: null,
      nextAmp: null,
      stopped: false,
      values: valsE,
      name: "E"
    } as iAmp;

    this._ampA.previousAmp = this._ampE;
    this._ampB.previousAmp = this._ampA;
    this._ampC.previousAmp = this._ampB;
    this._ampD.previousAmp = this._ampC;
    this._ampE.previousAmp = this._ampD;
    this._ampA.nextAmp = this._ampB;
    this._ampB.nextAmp = this._ampC;
    this._ampC.nextAmp = this._ampD;
    this._ampD.nextAmp = this._ampE;
    this._ampE.nextAmp = this._ampA;
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

interface iAmp {
  values: number[],
  position: number,
  inputs: number[],
  outputs: number[],
  stopped: boolean,
  previousAmp: iAmp,
  nextAmp: iAmp,
  name: string
}
