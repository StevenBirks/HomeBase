import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day6-5',
  templateUrl: './day6-5.component.html'
})
export class Day6_5Component implements OnInit {

  constructor() { }
  
    public inputString: string;
    public answer: number;
  
    private inputArray: number[];
    private currentConfiguration: number[]
    private currentConfigurations: string[];
    
    ngOnInit() {
    }
  
    public calculate(): void {
      this.inputArray = new Array<number>();
      this.answer = 0;
      this.currentConfiguration = new Array<number>();
      this.currentConfigurations = new Array<string>();
      let chosenBlockCount = 0;
      let chosenBlockIndex = 0;
    
      for (const item of this.inputString.split("\t"))
      {
        this.inputArray.push(Number.parseInt(item));
      }

      this.currentConfiguration = this.inputArray;
      
      while (!this._currentConfigurationsCheck()) {
        this.currentConfigurations.push(this.currentConfiguration.toString());

        chosenBlockCount = this.currentConfiguration.reduce((a:number, b:number) => {
          return Math.max(a, b);
        })

        chosenBlockIndex = this.currentConfiguration.indexOf(chosenBlockCount);
        
        this.currentConfiguration[chosenBlockIndex] = 0;        
        while (chosenBlockCount > 0) {
          chosenBlockIndex === 15
          ? chosenBlockIndex = 0
          : chosenBlockIndex++;

          this.currentConfiguration[chosenBlockIndex]++;
          chosenBlockCount--;
        }
      }
    }

    private _currentConfigurationsCheck(): boolean {
      for (let i = 0; i < this.currentConfigurations.length; i++) {
        if (this.currentConfigurations[i] === this.currentConfiguration.toString()) {
          this.answer = this.currentConfigurations.length - i;
          return true;
        }
      }

      return false;
    }
  }