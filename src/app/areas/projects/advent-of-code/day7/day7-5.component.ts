import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day7-5',
  templateUrl: './day7-5.component.html'
})
export class Day7_5Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: string;
  private _answerArray: iTower[];
  private _rowsString: string[];
  private _allPrograms: iProgram[];
  private _baseProgram: iProgram[];
  private _balanced: boolean;
  
  ngOnInit() {
  }

  public calculate(): void {
    this._rowsString = this.inputString.split("\n");
    this._allPrograms = new Array<iProgram>();
    this._answerArray = new Array<iTower>();

    this._setAllPrograms();
    this._setFirstBaseProgram();

    this._balanced = false;

    while (!this._balanced) {
      const towerNamesArray = this._getProgramsForTower(this._baseProgram[0].name);

      let iTowerArray = new Array<iTower>();
      iTowerArray = this._towerNamesToITower(towerNamesArray); 

      if (this._oddOneOut(iTowerArray).length === 0) {
        this._balanced = true;
        this._calculateResult();
      }
      
      if (!this._balanced) {
      this._baseProgram[0] = this._programNamesToIProgram([
        this._oddOneOut(iTowerArray)
      ])[0];
      }
    }
  } 

  private _towerWeight(towerBaseName: string): number {
    let towerWeight = 0;

    const allProgsInTower = this._allProgsInTower(towerBaseName);
    for (const prog of allProgsInTower) {
      towerWeight += prog.weight;
    }

    return towerWeight;
  }

  private _allProgsInTower(towerBaseName: string): iProgram[] {
    let currentTowerBaseName = towerBaseName;
    let towerProgs = new Array<string>();
    let towerBasesToGetProgsFor = new Array<string>();

    towerBasesToGetProgsFor.push(currentTowerBaseName);

    while (towerBasesToGetProgsFor.length > 0) {
      currentTowerBaseName = towerBasesToGetProgsFor[0];
      const progsForTower = this._getProgramsForTower(currentTowerBaseName);

      for (const newTower of progsForTower) {
        towerBasesToGetProgsFor.push(newTower);
      }

      towerProgs.push(currentTowerBaseName);
      towerBasesToGetProgsFor = towerBasesToGetProgsFor.filter((towerName: string) => {
        return towerName !== currentTowerBaseName;
      })

    }

    towerProgs = towerProgs.filter((prog: string) => {
      return prog !== towerBaseName;
    })

    let allTowerProgs = new Array<iProgram>();

    allTowerProgs = this._programNamesToIProgram(towerProgs);

    return allTowerProgs;
  }

  private _oddOneOut(iTowerArray: iTower[]): string {
    let totalArray = new Array<number>();

    for (const tower of iTowerArray) {
      totalArray.push(tower.programWeight + tower.towerWeight);
    }

    for (const total of totalArray) {
      if (totalArray.filter((value: number) => {
        return value === total;
      }).length === 1) {
        this._answerArray = iTowerArray;

        return iTowerArray.filter((tower: iTower) => {
          return tower.programWeight + tower.towerWeight === total;
        })[0].name;
      }
    }

    return "";
  }

  private _programWeight(programName: string): number {
    return this._allPrograms.filter((prog: iProgram) => {
      return prog.name === programName;
    })[0].weight;
  }

  private _getProgramsForTower(programName: string) : string[] {
    const towersString = this._rowsString.find((row:string) => {
      return row.substr(0, row.indexOf(" ")) === programName;
    });

    if (towersString.indexOf(">") !== -1) {
      return towersString.substr(towersString.indexOf(">") + 2).split(", ");
    } else {
      return new Array<string>();
    }
  }

  private _setAllPrograms(): void {
    for (const row of this._rowsString) {
      const firstProgName = row.substr(0, row.indexOf(" "));
      const firstProgWeight = Number.parseInt(row.substr(row.indexOf("(") + 1, row.indexOf(")") - 1));
      const newProg = <iProgram> {
        name: firstProgName,
        weight: firstProgWeight
      };

      this._allPrograms.push(newProg);
    }
  }

  private _setFirstBaseProgram(): void {
    this._baseProgram = this._allPrograms.slice();
    
    for (const row of this._rowsString) {
      if (row.indexOf(">") !== -1) {
        const otherProgNamesArray = row.substr(row.indexOf(">") + 2).split(", ");
        this._baseProgram = this._baseProgram.filter((prog: iProgram) => {
          return otherProgNamesArray.indexOf(prog.name) === -1;
        })        
      }
    }
  }

  private _towerNamesToITower(towerNames: string[]) : iTower[] {
    let newArray = new Array<iTower>();
    for (const towerName of towerNames) {      
      let newITower = <iTower> {
        name: towerName,
        programWeight: this._programWeight(towerName),
        towerWeight: this._towerWeight(towerName)
      };

      newArray.push(newITower)
    }
    return newArray;
  }

  private _programNamesToIProgram(programNames: string[]) : iProgram[] {
    let newArray = new Array<iProgram>();
    for (const programName of programNames) {      
      let newIProgram = <iProgram> {
        name: programName,
        weight: this._programWeight(programName)
      };

      newArray.push(newIProgram)
    }
    return newArray;
  }

  private _calculateResult() :void {

    const oddOneOutName = this._oddOneOut(this._answerArray);

    const oddTower = this._answerArray.filter((tower) => {
      return tower.name === oddOneOutName;
    })[0];

    const evenTower = this._answerArray.filter((tower) => {
      return tower.name !== oddOneOutName;
    })[0];

    this.answer = (evenTower.programWeight + evenTower.towerWeight - oddTower.towerWeight).toString();
  }
}

interface iProgram {
  name: string;
  weight: number;
}

interface iTower {
  name: string;
  programWeight: number
  towerWeight: number;
}
