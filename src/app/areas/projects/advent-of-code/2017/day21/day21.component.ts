import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day21',
  templateUrl: './day21.component.html'
})
export class Day21Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: string;

  private _pattern: string[];
  private _rules: iRule[];
  private _inputGrids: string[];

  ngOnInit() {
  }

  public calculate(): void {
    this._rules = new Array<iRule>();
    this._pattern = new Array<string>();
    this._pattern.push(".#.");
    this._pattern.push("..#");
    this._pattern.push("###");
    var rowsString = this.inputString.split("\n");

    for (const row of rowsString) {
      const newRule = <iRule>{
        input: row.split(" => ")[0].trim(),
        output: row.split(" => ")[1].trim(),
        opSize: row.split(" => ")[0].split("/").length === 2
          ? 2
          : 3
      }

      this._rules.push(newRule);
    }

    for (let i = 0; i < 5; i++) {
      this._inputGrids = new Array<string>();

      let newPattern = new Array<string>();
      let gridSize = this._pattern[0].length % 2 === 0
        ? 2
        : 3;

      this._inputGrids = this._generateInputGrids(gridSize);

      this._inputGrids.forEach((inputGrid) => {
        let rule = this._findRule(inputGrid, gridSize);
        // rotate 3 times
        if (rule === undefined) {
          inputGrid = this._rotateInput(inputGrid, gridSize);
          rule = this._findRule(inputGrid, gridSize);
        }
        if (rule === undefined) {
          inputGrid = this._rotateInput(inputGrid, gridSize);
          rule = this._findRule(inputGrid, gridSize);
        }
        if (rule === undefined) {
          inputGrid = this._rotateInput(inputGrid, gridSize);
          rule = this._findRule(inputGrid, gridSize);
        }
        // flip
        if (rule === undefined) {
          inputGrid = this._flipInput(inputGrid);
          rule = this._findRule(inputGrid, gridSize);
        }
        // rotate 3 more time
        if (rule === undefined) {
          inputGrid = this._rotateInput(inputGrid, gridSize);
          rule = this._findRule(inputGrid, gridSize);
        }
        if (rule === undefined) {
          inputGrid = this._rotateInput(inputGrid, gridSize);
          rule = this._findRule(inputGrid, gridSize);
        }
        if (rule === undefined) {
          inputGrid = this._rotateInput(inputGrid, gridSize);
          rule = this._findRule(inputGrid, gridSize);
        }
        newPattern.push(rule.output);
      });

      this._constructNewPattern(newPattern);

      this.answer = this._pattern.join("").match(new RegExp("\\#", "gi")).length.toString();
    }
  }

  private _findRule(input: string, ruleset: number): iRule {
    let subrules = this._rules.filter((rule) => {
      return rule.opSize === ruleset;
    });

    let rule = subrules.find((rule) => {
      return rule.input === input;
    });

    return rule;
  }

  private _rotateInput(input: string, opSize: number): string {
    let tempArray = input.split("/");
    let newArray = new Array<string>();

    if (opSize === 3) {
      newArray.push(`${tempArray[0][2]}${tempArray[1][2]}${tempArray[2][2]}`);
      newArray.push(`${tempArray[0][1]}${tempArray[1][1]}${tempArray[2][1]}`);
      newArray.push(`${tempArray[0][0]}${tempArray[1][0]}${tempArray[2][0]}`);
    } else {
      newArray.push(`${tempArray[0][1]}${tempArray[1][1]}`);
      newArray.push(`${tempArray[0][0]}${tempArray[1][0]}`);
    }

    return newArray.join("/");
  }

  private _flipInput(input: string): string {
    let tempArray = input.split("/");

    for (let i = 0; i < tempArray.length; i++) {
      tempArray[i] = tempArray[i].split("").reverse().join("");
    };

    return tempArray.join("/");
  }

  private _generateInputGrids(opSize: number): string[] {
    let generatedGridStrings = new Array<string>();
    let grid = new Array<Array<string>>();

    for (let i = 0; i < this._pattern.length; i++) {
      grid.push(this._pattern[i].split(""));
    }

    if (opSize === 2) {
      for (let i = 0; i < this._pattern.length / opSize; i++) {
        for (let j = 0; j < this._pattern.length / opSize; j++) {
          let newString = `${grid[i * opSize][j * opSize]}${grid[i * opSize][(j * opSize) + 1]}/${grid[(i * opSize) + 1][j * opSize]}${grid[(i * opSize) + 1][(j * opSize) + 1]}`;
          generatedGridStrings.push(newString);
        }
      }
    } else {
      for (let i = 0; i < this._pattern.length / opSize; i++) {
        for (let j = 0; j < this._pattern.length / opSize; j++) {
          let newString = `${grid[i * opSize][j * opSize]}${grid[i * opSize][(j * opSize) + 1]}${grid[i * opSize][(j * opSize) + 2]}/${grid[(i * opSize) + 1][j * opSize]}${grid[(i * opSize) + 1][(j * opSize) + 1]}${grid[(i * opSize) + 1][(j * opSize) + 2]}/${grid[(i * opSize) + 2][j * opSize]}${grid[(i * opSize) + 2][(j * opSize) + 1]}${grid[(i * opSize) + 2][(j * opSize) + 2]}`;
          generatedGridStrings.push(newString);
        }
      }
    }

    return generatedGridStrings;
  }

  private _constructNewPattern(newPattern: string[]) {
    let newConstructedPattern = new Array<string>();
    let segmentCount = newPattern[0].split("/").length;

    for (let group = 0; group < Math.sqrt(newPattern.length); group++) {
      for (let k = 0; k < segmentCount; k++) {
        let row = "";
        for (let j = 0; j < Math.sqrt(newPattern.length); j++) {
          row = row.concat(`${newPattern[j + (group * Math.sqrt(newPattern.length))].split("/")[k]}`);
        }
        newConstructedPattern.push(row);
      }
    }

    this._pattern = newConstructedPattern;

  }
}

interface iRule {
  input: string,
  output: string,
  opSize: number
}
