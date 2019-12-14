import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Pong201913DisplayComponent } from './pong-display/pong-display.component';

@Component({
  selector: 'app-2019-day13-5',
  templateUrl: './day13-5.component.html'
})
export class Day13_5_2019Component implements OnInit {
  constructor(public dialog: MatDialog) { }

  @ViewChild(Pong201913DisplayComponent) child: Pong201913DisplayComponent;

  public inputString: string;
  public answer: number;

  private _ampA: iAmp;
  private _currentAmp: iAmp;

  private _board: number[][];
  private _joystickInput: number;
  private _score: number;
  private _ballx: number;
  private _paddlex: number;

  private _go: number;

  private _pointerIncrement: number;
  private _updatePointer: boolean;

  private _paused: boolean;
  private _stop: boolean;

  ngOnInit() {
  };

  public calculate(): void {
    this.initialiseAmp();
    this.initGame();

    this._currentAmp = this._ampA;

    this.openDialog();
    this.calculateWithIntCodeComp();

    this.answer = this._score;
  }

  private calculateWithIntCodeComp(): void {
    this._stop = false;

    this.iterateGame();
  }

  private iterateGame() {
    while (this._currentAmp.outputs.length < 3 && !this._stop) {

      this.calculateNext();
      if (this._updatePointer) {
        this._currentAmp.position += this._pointerIncrement;
      }

      this._stop = this.calculateEnd();
    }

    if (!this._stop) {
      if (this._currentAmp.outputs[0] === -1 &&
        this._currentAmp.outputs[1] === 0) {
        this._score = this._currentAmp.outputs[2];
      } else {
        this.drawBoard(this._currentAmp.outputs);
      }
      this._currentAmp.outputs = new Array<number>();
    }

    if (this._go === 2) {
      this.child.updateValues(this._board, this._score);
      this.setJoystickPosition();
    }

    if (!this._stop) {
      window.setTimeout(() => {
        this.iterateGame();
      }, this._go === 2 ? 5 : 0);
    }
  }

  private drawBoard(paint: number[]) {
    this._board[paint[1]][paint[0]] = paint[2];

    if (paint[2] === 4) {
      this._ballx = paint[0];

      if (this._go === 1) {
        this._go++;
      }
      if (this._go === 0) {
        this._go++;
      }
    } else if (paint[2] === 3) {
      this._paddlex = paint[0];
    }
  }

  private setJoystickPosition() {
    if (this._paddlex > this._ballx) {
      this._joystickInput = -1;
    } else if (this._paddlex < this._ballx) {
      this._joystickInput = 1;
    } else {
      this._joystickInput = 0;
    }
  }

  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { board: this._board, score: this._score };

    const dialogRef = this.dialog.open(Pong201913DisplayComponent, dialogConfig);

    this.child = dialogRef.componentInstance;
    dialogRef.componentInstance.setJoystick.subscribe((data: number) => {
      this._joystickInput = data;
    })

    dialogRef.componentInstance.togglePause.subscribe(() => {
      this._paused = !this._paused;
    });
  }

  private initGame() {
    this._joystickInput = 0;
    this._paused = false;
    this._board = new Array<Array<number>>();
    this._score = 0;
    this._go = 0;
    this._ampA.values[0].value = 2;

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
    let offset = 0;

    if (modes[0] === 2) {
      offset = this._currentAmp.relativeTo;
    }

    const index2 = this.getIndex(val1 + offset);

    this._currentAmp.values[index2].value = this._joystickInput;
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
