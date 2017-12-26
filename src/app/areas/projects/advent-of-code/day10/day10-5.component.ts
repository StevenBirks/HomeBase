import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day10-5',
  templateUrl: './day10-5.component.html'
})
export class Day10_5Component implements OnInit {

  constructor() { }
  
  public inputString: string;
  public answer: string;  
  private _knotList: number[];
  private _currentPosition: number;
  private _skipSize: number;
  private _subListStartIndex: number;
  private _subListEndIndex: number;
  private _byteSequenceArray: number[];
  
  ngOnInit() {
  }

  public calculate(): void {
    this._byteSequenceArray = new Array<number>();
    this._currentPosition = 0;
    this._skipSize = 0;
    this._knotList = new Array<number>();   

    this.inputString.split("").forEach((input) => {
      this._byteSequenceArray.push(input.charCodeAt(0));
    })

    this._byteSequenceArray = this._byteSequenceArray.concat([17,31,73,47,23]); 
    
    for (let i = 0; i < 256; i++) {
      this._knotList.push(i);
    }

    for (let i = 0; i < 64; i++) {
      this._runKnotHash();
    }

    let denseHash = new Array<number>();

    for (let i = 0; i < 16; i++) {
      denseHash.push(this._calculateDenseHashEntry(i));
    }
    
    let hash = this._toHexString(denseHash);
    
    this.answer = hash;
  }

  private _runKnotHash(): void {
    this._byteSequenceArray.forEach((value) => {
      let sublist = this._getSublist(value);

      sublist = sublist.reverse();
      
      this._updateKnotListWithSubList(sublist);
      
      this._currentPosition += (value + this._skipSize);      
      this._skipSize++;

      while (this._currentPosition > 255) {
        this._currentPosition -= 256;        
      }    
    }) 
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

    if (this._currentPosition + sublist.length < 256) {
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

  private _calculateDenseHashEntry(index: number) : number {
    let result = this._knotList[index * 16];

    for (let i = 1; i < 16; i++) {
      result = result ^ this._knotList[(index * 16) + i];
    }

    return result;
  } 

  private _toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
  }
}
  