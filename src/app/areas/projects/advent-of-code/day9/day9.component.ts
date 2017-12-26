import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day9',
  templateUrl: './day9.component.html'
})
export class Day9Component implements OnInit {

  constructor() { }
  
    public inputString: string;
    public answer: number;
  
    private _inputStringTemp: string
    
    ngOnInit() {
    }
  
    public calculate(): void {
      this._inputStringTemp = this.inputString;
      this.answer = 0;
    
      // remove !
      for (let i = 0; i < this._inputStringTemp.length; i++)
      {
        if (this._inputStringTemp.charAt(i) === "!") {
          this._replaceWithSpace(i);
          this._replaceWithSpace(i+1);
          i++;
        }
      }

      this._inputStringTemp = this._inputStringTemp.replace(/\s/g, '');

      // remove garbage
      for (let i = 0; i < this._inputStringTemp.length; i++)
      {
        if (this._inputStringTemp.charAt(i) === "<") {
          this._replaceGarbageWithSpace(i);
          i++;
        }
      }

      this._inputStringTemp = this._inputStringTemp.replace(/\s/g, '');

      let value = 0;

      for (let i = 0; i < this._inputStringTemp.length; i++)
      {        
        if (this._inputStringTemp.charAt(i) === "{") {
          value++
        } else if (this._inputStringTemp.charAt(i) === "}") {
          this.answer += value;          
          value--;
        };
      }         
    }

    private _replaceWithSpace(index: number) {
      this._inputStringTemp = `${this._inputStringTemp.substr(0, index)} ${this._inputStringTemp.substr(index + 1, this._inputStringTemp.length - 1)}`;
    }

    private _replaceGarbageWithSpace(index: number) {
      while(this._inputStringTemp.charAt(index) !== ">") {
        this._replaceWithSpace(index);
        index++;
      }

      this._replaceWithSpace(index);      
    }
  }