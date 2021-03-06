import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day13',
  templateUrl: './day13.component.html'
})
export class Day13_2015Component implements OnInit {

    constructor() { }

    public inputString: string;
    public answer: number;
  
    private _people: iPerson[];
    private _inputRows: iInputLine[];
    private _tables: iTable[];
    private _usedPeople: iPerson[];
    private _permPeople: iPerson[][];
  
    ngOnInit() {
    }
  
    public calculate(): void {
      var inputRows = this.inputString.split("\n");
      this._people = new Array<iPerson>();
      this._inputRows = new Array<iInputLine>();
  
      inputRows.forEach((row) => {
        const sign = row.split(" ")[2] === "gain" ? 1 : -1;
  
        let newInputLine = <iInputLine>{
          name: row.split(" ")[0],
          neighbour: row.split(" ")[10].substr(0, row.split(" ")[10].length - 1),
          happiness: sign * Number.parseInt(row.split(" ")[3])
        };
  
        this._inputRows.push(newInputLine);
      });
  
      this._people.push(<iPerson>{ name: this._inputRows[0].name });
  
      this._inputRows.forEach((row) => {
        let contains = false;
        this._people.forEach((person) => {
          if (row.name === person.name) {
            contains = true;
          }
        });
  
        if (!contains) {
          this._people.push(<iPerson>{ name: row.name });
        }
      });
  
      this._tables = new Array<iTable>();
  
      this._usedPeople = new Array<iPerson>();
      this._permPeople = new Array<Array<iPerson>>();
      this.PermutePeople(this._people);
      this.CreateTables();
  
      this.answer = this._tables.reduce((prev, current) => {
        return (prev.totalHappiness > current.totalHappiness) ? prev : current
      }).totalHappiness;
    }
  
    private CreateTables() {
      this._permPeople.forEach((perm) => {
        var table = <iTable>{
          people: perm,
          totalHappiness: 0
        };
  
        table = this.CalculateTableHappiness(table);
  
        this._tables.push(table);
      })
    }
  
    private PermutePeople(input: iPerson[]) {
      for (let i = 0; i < input.length; i++) {
        let person = input.splice(i, 1)[0];
        this._usedPeople.push(person);
        if (input.length == 0) {
          this._permPeople.push(this._usedPeople.slice());
        }
  
        this.PermutePeople(input);
        input.splice(i, 0, person);
        this._usedPeople.pop();
      }
    };
  
  
    private CalculateTableHappiness(table: iTable): iTable {
      let happiness = 0;
      table.people.forEach(tablePerson => {
  
        let personIndex = table.people.findIndex((listPerson) => {
          return listPerson.name === tablePerson.name;
        });
        const neighbour1 = personIndex === 7
          ? table.people[0]
          : table.people[personIndex + 1];
  
        const neighbour2 = personIndex === 0
          ? table.people[7]
          : table.people[personIndex - 1];
  
        happiness += this._inputRows.find((row) => {
          return row.neighbour === neighbour1.name && row.name === tablePerson.name;
        }).happiness;
  
        happiness += this._inputRows.find((row) => {
          return row.neighbour === neighbour2.name && row.name === tablePerson.name;
        }).happiness;
      });
  
      table.totalHappiness = happiness;
  
      return table;
    }
  }
  
  interface iPerson {
    name: string
  }
  
  interface iInputLine {
    name: string,
    neighbour: string,
    happiness: number
  }
  
  interface iTable {
    people: iPerson[],
    totalHappiness: number
  }