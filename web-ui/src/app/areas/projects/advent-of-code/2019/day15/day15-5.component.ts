import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Droid201915DisplayComponent } from './Droid-display/droid-display.component';
import { windowCount } from 'rxjs/operators';

@Component({
  selector: 'app-2019-day15-5',
  templateUrl: './day15-5.component.html'
})
export class Day15_5_2019Component implements OnInit {
  constructor(public dialog: MatDialog) { }

  @ViewChild(Droid201915DisplayComponent) child: Droid201915DisplayComponent;

  public inputString: string;
  public answer: number;

  private _ampA: iAmp;
  private _currentAmp: iAmp;

  private _board: string[][];
  private _directionInput: number;
  private _minutes: number;

  private _droid: iDroid;
private _overrideAuto: boolean;
  private _pointerIncrement: number;
  private _updatePointer: boolean;

  private _stop: boolean;

  ngOnInit() {
  };

  public calculate(): void {
    this.initialiseAmp();
    this.initBoard();

    this._currentAmp = this._ampA;

    this.openDialog();
    this.calculateWithIntCodeComp();
  }

  private calculateWithIntCodeComp(): void {
    this._stop = false;

    this.iterateGame();
  }

  private iterateGame() {
    while (this._currentAmp.outputs.length < 1 && !this._stop) {

      this.calculateNext();
      if (this._updatePointer) {
        this._currentAmp.position += this._pointerIncrement;
      }

      this._stop = this.calculateEnd();
    }

    if (!this._stop) {
      this.drawBoard(this._currentAmp.outputs[0]);
      this._currentAmp.outputs = new Array<number>();
    }

    this.child.updateValues(this._board);

    if (!this._stop && !this._overrideAuto) {
      window.setTimeout(() => {
        this.iterateGame();
      }, 1);
    }
  }

  private updateMinutes() {
    this._minutes++;
    this.child.setMintes(this._minutes);
    this.answer = this._minutes;
  }

  private iterateO2() {
    window.setTimeout(() => {
      let newBoard = new Array<Array<string>>();

      for (let i = 0; i < 50; i++) {
        let newRow = new Array<string>(); 

        for (let j = 0; j < 50; j++) {
          newRow.push(this._board[i][j]);
        }
  
        newBoard.push(newRow);
      }

      for (let i = 1; i < 49; i++) {
        for (let j = 1; j < 49; j++) {
          if (this._board[i][j] === "O") {
            if (this._board[i - 1][j] === ".") {
              newBoard[i - 1][j] = "O";
            }
            if (this._board[i + 1][j] === ".") {
              newBoard[i + 1][j] = "O";
            }
            if (this._board[i][j - 1] === ".") {
              newBoard[i][j - 1] = "O";
            }
            if (this._board[i][j + 1] === ".") {
              newBoard[i][j + 1] = "O";
            }
          }
        }
      }

      this._board = newBoard;

      this.updateMinutes();
      this.child.updateValues(this._board);
      if (this.hasAnyDots()) {
        this.iterateO2();
      }
    }, 100);
  }

  private hasAnyDots(): boolean {
    let hasAnyDots = false;

    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        if (this._board[i][j] === ".") {
          return true;
        }
      }
    }

    return hasAnyDots;
  }

  private drawBoard(instruction: number) {
    if (instruction === 0) {
      this.drawWall();
    } else if (instruction === 1) {
      this.moveDroid();
    } else if (instruction === 2) {
      this.markOxygen();
    } else {
    }
  }

  private drawWall() {
    let y = 0;
    let x = 0;

    switch (this._directionInput) {
      case 1:
        y--;
        break;
      case 2:
        y++;
        break;
      case 3:
        x--;
        break;
      case 4:
        x++;
        break;
    }
    this._board[this._droid.y + y][this._droid.x + x] = "#";
  }

  private markOxygen() {
    this._board[this._droid.y][this._droid.x] = ".";

    let y = 0;
    let x = 0;

    switch (this._directionInput) {
      case 1:
        y--;
        break;
      case 2:
        y++;
        break;
      case 3:
        x--;
        break;
      case 4:
        x++;
        break;
    }
    this._board[this._droid.y + y][this._droid.x + x] = "O";
    this._droid.x = this._droid.x + x;
    this._droid.y = this._droid.y + y;
  }

  private moveDroid() {
    if (this._board[this._droid.y][this._droid.x] !== "O") {
      this._board[this._droid.y][this._droid.x] = ".";
    }

    let y = 0;
    let x = 0;

    switch (this._directionInput) {
      case 1:
        y--;
        break;
      case 2:
        y++;
        break;
      case 3:
        x--;
        break;
      case 4:
        x++;
        break;
    }

    this._board[this._droid.y + y][this._droid.x + x] = "D";
    this._droid.x = this._droid.x + x;
    this._droid.y = this._droid.y + y;
  }

  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { board: this._board };

    const dialogRef = this.dialog.open(Droid201915DisplayComponent, dialogConfig);

    this.child = dialogRef.componentInstance;
    dialogRef.componentInstance.setDirection.subscribe((data: number) => {
      this._directionInput = data;
      this._overrideAuto = true;
      this._stop = false;
      this.iterateGame();
    })
    dialogRef.componentInstance.iterateO2.subscribe(() => {
      this._minutes = 0;
      this._board[this._droid.y][this._droid.x] = "."
      this.iterateO2();
    })

    dialogRef.componentInstance.iterate.subscribe(() => {
      this._overrideAuto = false;
      this.iterateGame();
    })

    dialogRef.componentInstance.stopEvent.subscribe(() => {
      this._stop = true;
    })
  }

  private applyAIInput() {
    let directions = new Array<number>()
    if (this._board[this._droid.y - 1][this._droid.x] === '-') {
      directions.push(1);
    }
    if (this._board[this._droid.y + 1][this._droid.x] === '-') {
      directions.push(2);
    }
    if (this._board[this._droid.y][this._droid.x - 1] === '-') {
      directions.push(3);
    }
    if (this._board[this._droid.y][this._droid.x + 1] === '-') {
      directions.push(4);
    }

    if (directions.length === 0) {
      if (this._board[this._droid.y - 1][this._droid.x] !== '#') {
        directions.push(1);
      }
      if (this._board[this._droid.y + 1][this._droid.x] !== '#') {
        directions.push(2);
      }
      if (this._board[this._droid.y][this._droid.x - 1] !== '#') {
        directions.push(3);
      }
      if (this._board[this._droid.y][this._droid.x + 1] !== '#') {
        directions.push(4);
      }
    }

    this._directionInput = directions[Math.floor(Math.random() * directions.length)]
  }

  private initBoard() {
    this._directionInput = 1;
    this._overrideAuto = false;
    this._board = new Array<Array<string>>();

    for (let i = 0; i < 50; i++) {
      let newRow = new Array<string>();

      for (let j = 0; j < 50; j++) {
        newRow.push("-");
      }

      this._board.push(newRow);
    }

    this._droid = <iDroid>{
      x: 25,
      y: 25
    }

    this._board[25][25] = "D";
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

    if (!this._overrideAuto) {
      this.applyAIInput();
    }

    this._currentAmp.values[index2].value = this._directionInput;
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

interface iDroid {
  x: number,
  y: number
}
