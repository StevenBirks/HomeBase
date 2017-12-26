import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day10',
  templateUrl: './day10.component.html'
})
export class Day10Component implements OnInit {

  constructor() { }
  
    public inputString: string;
    public answer: number;  
    private _lengthsSequence: number[];
    private _knotList: number[];
    private _currentPosition: number;
    private _skipSize: number;
    private _subListStartIndex: number;
    private _subListEndIndex: number;
    
    ngOnInit() {
    }
  
    public calculate(): void {
      this._lengthsSequence = new Array<number>();
      this.answer = 0;
      this._currentPosition = 0;
      this._skipSize = 0;


      this.inputString.split(",").forEach((input) => {
        this._lengthsSequence.push(Number.parseInt(input));        
      });
      
      this._knotList = new Array<number>();

      for (let i = 0; i < 256; i++) {
        this._knotList.push(i);
      }

      this._lengthsSequence.forEach((value) => {
        let sublist = this._getSublist(value);

        sublist = sublist.reverse();
        
        this._updateKnotListWithSubList(sublist);

        this._currentPosition += (value + this._skipSize);
        
        if (this._currentPosition > 255) {
          this._currentPosition -= 256;
        }
        
        this._skipSize++;
      }) 
            
      this.answer = this._knotList[0] * this._knotList[1];

    }

    private _getSublist(requiredLength: number): number[] {
      let returnList = new Array<number>();

      if (this._currentPosition + requiredLength < 256) {
        returnList = this._knotList.slice(this._currentPosition, this._currentPosition + requiredLength);
        this._subListStartIndex = this._currentPosition; 
        this._subListEndIndex = this._currentPosition + requiredLength;   
      } else {
        returnList = this._knotList.slice(this._currentPosition);
        this._subListEndIndex = requiredLength - returnList.length - 1;   
        returnList = returnList.concat(this._knotList.slice(0, requiredLength - returnList.length));
        this._subListStartIndex = this._currentPosition;         
      }

      return returnList;      
    }

    private _updateKnotListWithSubList(sublist: number[]): void {
      let updatedList = new Array<number>();

      if (this._currentPosition + sublist.length < 255) {
        updatedList = this._knotList.slice(0, this._currentPosition); 
        updatedList = updatedList.concat(sublist);
        updatedList = updatedList.concat(this._knotList.slice(this._currentPosition + sublist.length));       
      } else {
        updatedList = sublist.slice(sublist.length - this._subListEndIndex - 1);
        updatedList = updatedList.concat(this._knotList.slice(updatedList.length, this._subListStartIndex));
        updatedList = updatedList.concat(sublist.slice(0, sublist.length - this._subListEndIndex - 1));
      }

      this._knotList = updatedList;      
    }
}
  