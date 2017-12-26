import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day16-5',
  templateUrl: './day16-5.component.html'
})
export class Day16_5Component implements OnInit {

  constructor() { }
  
    public inputString: string;
    public answer: string;
  
    private _commands: iCommand[];
    private _programs: string[];
    private _count: number;
    private _repeat: boolean;

    private _patterns: string[];
    
    ngOnInit() {
    }
  
    public calculate(): void {
      this._commands = new Array<iCommand>();
      this._programs = new Array<string>();
      this._patterns = new Array<string>();
      this._count = 0;
  
      this.inputString.split(",").forEach((value) => {
        let type = value.split("")[0] === "s" 
          ? commandType.spin
          : value.split("")[0] === "x" 
            ? commandType.exchange 
            : commandType.partner;
  
        let values = value.substr(1);
  
        let newCommand = <iCommand> {
          commandType: type,
          vs: type === commandType.spin 
            ? Number.parseInt(values)
            : null,
          ve1: type === commandType.exchange
            ? Number.parseInt(values.split("/")[0])
            : null,
          ve2: type === commandType.exchange
            ? Number.parseInt(values.split("/")[1])
            : null,
          v1: type === commandType.partner
            ? values.split("/")[0]
            : null,
          v2: type === commandType.partner 
            ? values.split("/")[1]
            : null
        }
  
        this._commands.push(newCommand);
      });
  
      for (let i = 0; i < 16; i++) {
        this._programs.push(String.fromCharCode(i+97));
      }
  
      this._performDanceFindRepeat();

      let firstDanceOfRepeat = this._patterns.indexOf(this._programs.join(""));

      let repeat = this._count - firstDanceOfRepeat - 1;

      let iterationsLeftToComplete = 1000000000
                                   - this._count
                                   - (repeat * Math.floor((1000000000 - this._count)/(this._count - firstDanceOfRepeat - 1)));

      for (let i = 0; i < iterationsLeftToComplete; i++) {
        this._performDance();
      }

      this.answer = this._programs.join("");      
    }
  
    private _performDanceFindRepeat() : void {
      while(!this._repeat) {
        this._performDance();    
        this._checkPattern();
        this._patterns.push(this._programs.join(""))
        this._count++;
      }
    }

    private _performDance() : void { 
      this._commands.forEach((command) => {
        if (command.commandType === commandType.spin) {
          this._performSpin(command.vs);
        } else if (command.commandType === commandType.exchange) {
          this._performExchange(command.ve1, command.ve2);
        } else {
          this._performPartner(command.v1, command.v2);        
        } 
      })
    }

    private _checkPattern(): void {
      if (this._patterns.filter((pattern) => {
        return pattern === this._programs.join("");   
      }).length > 0) {
        this._repeat = true;
      }
    }
  
    private _performSpin(spinInput: number): void {
      this._programs = this._programs.slice(16-spinInput).concat(this._programs.slice(0, 16-spinInput));
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
    vs: number,
    ve1: number,
    ve2: number
    v1: string,
    v2: string
  }
  
  enum commandType {
    spin,
    exchange,
    partner
  }
  