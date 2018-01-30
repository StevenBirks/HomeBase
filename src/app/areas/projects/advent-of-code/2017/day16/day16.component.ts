import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day16',
  templateUrl: './day16.component.html'
})
export class Day16Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: string;

  private _commands: iCommand[];
  private _programs: string[];
  
  ngOnInit() {
  }

  public calculate(): void {
    this._commands = new Array<iCommand>();
    this._programs = new Array<string>();

    this.inputString.split(",").forEach((value) => {
      let type = value.split("")[0] === "s" 
        ? commandType.spin
        : value.split("")[0] === "x" 
          ? commandType.exchange 
          : commandType.partner;

      let values = value.substr(1);

      let newCommand = <iCommand> {
        commandType: type,
        v1: type === commandType.spin 
          ? values
          : values.split("/")[0],
        v2: type === commandType.spin 
          ? null
          : values.split("/")[1],
      }

      this._commands.push(newCommand);
    });

    for (let i = 0; i < 16; i++) {
      this._programs.push(String.fromCharCode(i+97));
    }

    this._commands.forEach((command) => {
      if (command.commandType === commandType.spin) {
        this._performSpin(Number.parseInt(command.v1));
      } else if (command.commandType === commandType.exchange) {
        this._performExchange(Number.parseInt(command.v1), Number.parseInt(command.v2));
        
      } else if (command.commandType === commandType.partner) {
        this._performPartner(command.v1, command.v2);        
      } 
    })

    this.answer = this._programs.join("");
  }

  private _performSpin(spinInput: number): void {
    let tempArray = new Array<string>();
    tempArray = (this._programs.slice(16-spinInput));
    tempArray = tempArray.concat(this._programs.slice(0, 16-spinInput));
    this._programs = tempArray;
  }

  private _performExchange(index1: number, index2: number): void {
    let tempValue = this._programs[index1];
    this._programs[index1] = this._programs[index2];
    this._programs[index2] = tempValue;
  }

  private _performPartner(name1: string, name2: string): void {
    let name1Index = this._programs.indexOf(name1);
    let name2Index = this._programs.indexOf(name2);

    this._programs[name1Index] = name2;
    this._programs[name2Index] = name1;
  }
}

interface iCommand {
  commandType: commandType,
  v1: string,
  v2: string
}

enum commandType {
  spin,
  exchange,
  partner
}
