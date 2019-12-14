import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Pong201913DisplayComponent } from './pong-display/pong-display.component';


@Component({
  selector: 'app-2019-day13',
  templateUrl: './day13.component.html'
})
export class Day13_2019Component implements OnInit {
  constructor() { }

  public inputString: string;
  public answer: number;

  private _ampA: iAmp;
  private _currentAmp: iAmp;

  private _board: number[][];

  private _pointerIncrement: number;
  private _updatePointer: boolean;

  ngOnInit() {
  };

  public calculate(): void {
    this.initialiseAmp();
    this.initBoard();

    this._currentAmp = this._ampA;

    this.calculateWithIntCodeComp();

    let count = 0;

    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 44; j++) {
        if (this._board[i][j] === 2) {
          count++;
        }
      }
    }


    this.answer = count;
    console.log(this._board);
  }

  private calculateWithIntCodeComp(): void {
    let stop = false;

    while (!stop) {
      while (this._currentAmp.outputs.length < 3 && !stop) {

        this.calculateNext();
        if (this._updatePointer) {
          this._currentAmp.position += this._pointerIncrement;
        }

        stop = this.calculateEnd();
      }

      if (!stop) {
        this.drawBoard(this._currentAmp.outputs);
        this._currentAmp.outputs = new Array<number>();
      }
    }
  }

  private drawBoard(paint: number[]) {
    this._board[paint[1]][paint[0]] = paint[2];
  }

  private initBoard() {
    this._board = new Array<Array<number>>();

    for (let i = 0; i < 24; i++) {
      let newRow = new Array<number>();

      for (let j = 0; j < 44; j++) {
        newRow.push(0);
      }

      this._board.push(newRow);
    }
  }

  private calculateNext() {
    this._updatePointer = true;
    const inst = this.getInstruction(this._currentAmp.values.find((value) => {
      return value.position === this._currentAmp.position;
    }).value);

    this.setPointerIncrement(inst);

    const modes = this.getModes(this._currentAmp.values.find((value) => {
      return value.position === this._currentAmp.position;
    }).value);

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
      case instruction.modifyRelative:
        this.actionModifyRelative(modes);
        break;
      default:
        debugger;
        console.log("BAD");
        break;
    }
  }

  private actionAdd(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    const val2 = this.getValue(modes[1], 2);
    const index1 = this.getIndex(this._currentAmp.position + 3);
    const valForIndex1 = this.getValueForPosition(index1);
    let index2 = this.getIndex(valForIndex1);

    if (modes[2] === 2) {
      index2 = this.getIndex(valForIndex1 + this._currentAmp.relativeTo);
    }

    this._currentAmp.values[index2].value = val1 + val2;
  }

  private actionMultiply(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    const val2 = this.getValue(modes[1], 2);

    const index1 = this.getIndex(this._currentAmp.position + 3);
    const valForIndex1 = this.getValueForPosition(index1);
    let index2 = this.getIndex(valForIndex1);

    if (modes[2] === 2) {
      index2 = this.getIndex(valForIndex1 + this._currentAmp.relativeTo);
    }
    this._currentAmp.values[index2].value = val1 * val2;
  }

  private actionInput(modes: paramMode[]) {
    const index1 = this.getIndex(this._currentAmp.position + 1);
    const val1 = this._currentAmp.values[index1].value;
    const index2 = this.getIndex(val1 + this._currentAmp.relativeTo);

    this._currentAmp.values[index2].value = this._currentAmp.inputs[0];
    // shift???
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

    const index1 = this.getIndex(this._currentAmp.position + 3);
    const valForIndex1 = this.getValueForPosition(index1);
    let index2 = this.getIndex(valForIndex1);

    if (modes[2] === 2) {
      index2 = this.getIndex(valForIndex1 + this._currentAmp.relativeTo);
    }

    this._currentAmp.values[index2].value = valToStore;
  }

  private actionEquals(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);
    const val2 = this.getValue(modes[1], 2);

    let valToStore = 0;

    if (val1 === val2) {
      valToStore = 1;
    }

    const index1 = this.getIndex(this._currentAmp.position + 3);
    const valForIndex1 = this.getValueForPosition(index1);
    let index2 = this.getIndex(valForIndex1);

    if (modes[2] === 2) {
      index2 = this.getIndex(valForIndex1 + this._currentAmp.relativeTo);
    }

    this._currentAmp.values[index2].value = valToStore;
  }

  private actionModifyRelative(modes: paramMode[]) {
    const val1 = this.getValue(modes[0], 1);

    this._currentAmp.relativeTo += val1;
  }

  private getValue(mode: paramMode, posOffset: number): number {
    let val = 0;
    const index1 = this.getIndex(this._currentAmp.position + posOffset);
    const val1 = this._currentAmp.values[index1].value;

    if (mode === paramMode.position) {
      const index2 = this.getIndex(val1);
      val = this._currentAmp.values[index2].value
    } else if (mode === paramMode.immediate) {
      val = val1;
    } else {
      const index3 = this.getIndex(val1 + this._currentAmp.relativeTo);
      val = this._currentAmp.values[index3].value
    }

    return val;
  }

  private getValueForPosition(position: number): number {
    return this._currentAmp.values.find((value) => {
      return value.position === position;
    }).value;
  }

  private getIndex(position: number): number {
    let index = this._currentAmp.values.findIndex((value) => {
      return value.position === position;
    });

    if (index === -1) {
      const newValue = { position: position, value: 0 } as iValue;
      this._currentAmp.values.push(newValue);
      index = this._currentAmp.values.length - 1;
    }

    return index;
  }

  private getModes(value: number): paramMode[] {
    let paramModes = new Array<paramMode>();

    const valArray = value.toString().split("").reverse();

    const firstMode = valArray[2] === "0"
      ? paramMode.position
      : valArray[2] === "1"
        ? paramMode.immediate
        : valArray[2] === "2"
          ? paramMode.relative
          : paramMode.position

    paramModes.push(firstMode);

    const secondMode = valArray[3] === "0"
      ? paramMode.position
      : valArray[3] === "1"
        ? paramMode.immediate
        : valArray[3] === "2"
          ? paramMode.relative
          : paramMode.position

    paramModes.push(secondMode);

    const thirdMode = valArray[4] === "0"
      ? paramMode.position
      : valArray[4] === "1"
        ? paramMode.immediate
        : valArray[4] === "2"
          ? paramMode.relative
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
        return instruction.modifyRelative
      case 99:
        return instruction.end;
      default:
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
        case instruction.modifyRelative:
          this._pointerIncrement = 2;
          break;
        case instruction.end:
          this._pointerIncrement = 0;
          break;
      }
    }
  }

  private calculateEnd(): boolean {
    // calculate stop
    let mightBe99 = 0;
    var a = this._currentAmp.values.find((values) => {
      return values.position === this._currentAmp.position;
    });

    if (a !== undefined) {
      mightBe99 = a.value;
    }

    return mightBe99 === 99;
  }

  private initialiseAmp() {
    let valsA = new Array<iValue>();

    const inputStringVals = this.inputString.split(",");

    for (let i = 0; i < inputStringVals.length; i++) {
      valsA.push({ position: i, value: Number.parseInt(inputStringVals[i]) } as iValue);
    }

    this._ampA = {
      inputs: new Array<number>(),
      outputs: new Array<number>(),
      position: 0,
      relativeTo: 0,
      stopped: false,
      values: valsA,
      name: "A"
    } as iAmp;
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
  modifyRelative,
  end
}

enum paramMode {
  position,
  immediate,
  relative
}

interface iAmp {
  values: iValue[],
  position: number,
  relativeTo: number,
  inputs: number[],
  outputs: number[],
  stopped: boolean,
  name: string
}

interface iValue {
  position: number;
  value: number;
}