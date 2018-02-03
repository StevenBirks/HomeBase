import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day7',
  templateUrl: './day7.component.html'
})
export class Day7Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: string;
  private _allPrograms: iProgram[];
  
  ngOnInit() {
  }

  public calculate(): void {
    const rowsString = this.inputString.split("\n");

    this._allPrograms = new Array<iProgram>();

    for (const row of rowsString) {
      const firstProgName = row.substr(0, row.indexOf(" "));
      const firstProgWeight = Number.parseInt(row.substr(row.indexOf("(") + 1, row.indexOf(")") - 1));
      const newProg = <iProgram> {
        name: firstProgName,
        weight: firstProgWeight
      };

      this._allPrograms.push(newProg);
    }
    
    for (const row of rowsString) {
      if (row.indexOf(">") !== -1) {
        const otherProgNamesArray = row.substr(row.indexOf(">") + 2).split(", ");
        this._allPrograms = this._allPrograms.filter((prog: iProgram) => {
          return otherProgNamesArray.indexOf(prog.name) === -1;
        })        
      }
    }

    this.answer = this._allPrograms[0].name;
  } 
}

interface iProgram {
  name: string;
  weight: number;
}
