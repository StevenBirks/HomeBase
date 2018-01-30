import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day6',
  templateUrl: './day6.component.html'
})
export class Day6_2015Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;

  private _instructions: iInstruction[];
  private _grid: number[][];

  ngOnInit() {
  }

  public calculate(): void {
    var inputRows = this.inputString.split("\n");
    this.answer = 0;

    this._instructions = new Array<iInstruction>();

    for (const row of inputRows) {
      let coordinates = this._getCoordinates(row);
      let newInstruction = <iInstruction>{
        type: this._getCommandType(row),
        start: coordinates[0],
        end: coordinates[1]
      };

      this._instructions.push(newInstruction);
    }

    this._grid = new Array<Array<number>>();

    for (let i = 0; i < 1000; i++) {
      let gridLine = new Array<number>();

      for (let j = 0; j < 1000; j++) {
        gridLine.push(0);
      }

      this._grid.push(gridLine);
    }

    this._instructions.forEach((instruction) => {
      for (let y = instruction.start.y; y <= instruction.end.y; y++) {  
        for (let x = instruction.start.x; x <= instruction.end.x; x++) {
          this._grid[y][x] = this._performInstruction(instruction, x, y);
        }  
      }
    });

    this.answer = this._getAnswer();

  }

  private _getCoordinates(row: string): iCoordinate[] {
    let splitRow = row.split(" ");

    let coordinates = new Array<iCoordinate>();

    if (splitRow.length === 4) {
      coordinates.push(<iCoordinate> {
        x: Number.parseInt(splitRow[1].split(",")[0]),
        y: Number.parseInt(splitRow[1].split(",")[1])
      });
      coordinates.push(<iCoordinate> {
        x: Number.parseInt(splitRow[3].split(",")[0]),
        y: Number.parseInt(splitRow[3].split(",")[1])
      });
    } else {
      coordinates.push(<iCoordinate> {
        x: Number.parseInt(splitRow[2].split(",")[0]),
        y: Number.parseInt(splitRow[2].split(",")[1])
      });
      coordinates.push(<iCoordinate> {
        x: Number.parseInt(splitRow[4].split(",")[0]),
        y: Number.parseInt(splitRow[4].split(",")[1])
      });
    }

    return coordinates;
  }

  private _getCommandType(row: string): SwitchType {
    let splitRow = row.split(" ");

    if (splitRow.length === 4) {
      return SwitchType.toggle;
    } else {
      if (splitRow[1] === "on") {
        return SwitchType.turnOn;
      } else {
        return SwitchType.turnOff;
      }
    }
  }

  private _performInstruction(instruction: iInstruction, x: number, y: number): number {
    if (instruction.type === SwitchType.turnOn) {
      return 1;
    } else if (instruction.type === SwitchType.turnOff) {
      return 0;
    } else {
      if (this._grid[y][x] === 1) {
        return 0;
      } else {
        return 1;
      }
    }
  }

  private _getAnswer(): number {
    let answer = 0;

    for (let i = 0; i < 1000; i++) {
      answer += this._grid[i].filter((rowEntry) => {
        return rowEntry === 1;
      }).length;
    }

    return answer;
  }
}

interface iInstruction {
  type: SwitchType,
  start: iCoordinate,
  end: iCoordinate
}

interface iCoordinate {
  x: number,
  y: number
}

enum SwitchType {
  turnOn,
  turnOff,
  toggle
}
