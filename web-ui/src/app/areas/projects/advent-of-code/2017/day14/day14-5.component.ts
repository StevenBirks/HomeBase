import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day14-5',
  templateUrl: './day14-5.component.html'
})
export class Day14_5Component implements OnInit {

  constructor() { }
  
    public inputString: string;
    public answer: number;

    public _disk: number[][];
    public _knotHashes: string[];
    
    private _knotList: number[];
    private _currentPosition: number;
    private _skipSize: number;
    private _subListStartIndex: number;
    private _subListEndIndex: number;
    private _byteSequenceArray: number[];
    
    ngOnInit() {
    }
  
    public calculate(): void {
      this._knotHashes = new Array<string>();

      for (let i = 0; i < 128; i++) {
        const knotHashInput = `${this.inputString}-${i}`;
        
        this._computeKnotHash(knotHashInput)
      }

      this._disk = new Array<Array<number>>();

      for (let i = 0; i < 128; i++) {
        let newArray = new Array<number>();
        for (let j = 0; j < 128; j++) {
          newArray.push(0);
        }
        this._disk.push(newArray);
      }  

      
      for (let i = 0; i < 128; i++) {
        let binaryString = "";

        for (let j = 0; j < this._knotHashes[i].length; j++) {
          let binary = Number.parseInt(this._knotHashes[i][j],16).toString(2);
          while (binary.length < 4) {
            binary = "0".concat(binary);
          }
          binaryString += binary;
        }

        for (let j = 0; j < binaryString.length; j++) {
          this._disk[i][j] = Number.parseInt(binaryString[j]);
        }
      }

      this.answer = 0;

      this._countRegions();
    }

    private _computeKnotHash(knotHashInput: string) {
      this._byteSequenceArray = new Array<number>();
      this._currentPosition = 0;
      this._skipSize = 0;
      this._knotList = new Array<number>();   
  
      knotHashInput.split("").forEach((input) => {
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
      
      this._knotHashes.push(this._toHexString(denseHash));            
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

    private _countRegions(): void {
      let diskCopy = new Array<Array<number>>();

      for (let i = 0; i < 128; i++) {
        let newArray = new Array<number>();
        for (let j = 0; j < 128; j++) {
          newArray.push(this._disk[i][j]);
        }
        diskCopy.push(newArray);
      }
      
      for (let i = 0; i < 128; i++) {
        for (let j = 0; j < 128; j++) {
          if (diskCopy[i][j] !== 2 && this._disk[i][j] === 1) {
            diskCopy[i][j] = 2;
            let locationsInCurrentGroup = new Array<iLocation>();
            let locationsToCheckInCurrentGroup = new Array<iLocation>();

            const newLocation = <iLocation> {
              x: i,
              y: j
            }

            locationsToCheckInCurrentGroup.push(newLocation);

            while(locationsToCheckInCurrentGroup.length > 0) {
              if (locationsToCheckInCurrentGroup[0].x-1 >= 0 &&
                  this._disk[locationsToCheckInCurrentGroup[0].x-1][locationsToCheckInCurrentGroup[0].y] === 1 &&
                  diskCopy[locationsToCheckInCurrentGroup[0].x-1][locationsToCheckInCurrentGroup[0].y] !== 2) {
                const newLocation = <iLocation> {
                  x: locationsToCheckInCurrentGroup[0].x-1,
                  y: locationsToCheckInCurrentGroup[0].y
                }
    
                locationsToCheckInCurrentGroup.push(newLocation);
                diskCopy[locationsToCheckInCurrentGroup[0].x-1][locationsToCheckInCurrentGroup[0].y] = 2;
              }

              if (locationsToCheckInCurrentGroup[0].x+1 < 128 &&
                this._disk[locationsToCheckInCurrentGroup[0].x+1][locationsToCheckInCurrentGroup[0].y] === 1 &&
                diskCopy[locationsToCheckInCurrentGroup[0].x+1][locationsToCheckInCurrentGroup[0].y] !== 2) {
                const newLocation = <iLocation> {
                  x: locationsToCheckInCurrentGroup[0].x+1,
                  y: locationsToCheckInCurrentGroup[0].y
                }
    
                locationsToCheckInCurrentGroup.push(newLocation);
                diskCopy[locationsToCheckInCurrentGroup[0].x+1][locationsToCheckInCurrentGroup[0].y] = 2;
              }
              
              if (locationsToCheckInCurrentGroup[0].y-1 >= 0 &&
                this._disk[locationsToCheckInCurrentGroup[0].x][locationsToCheckInCurrentGroup[0].y-1] === 1 &&
                diskCopy[locationsToCheckInCurrentGroup[0].x][locationsToCheckInCurrentGroup[0].y-1] !== 2) {
                const newLocation = <iLocation> {
                  x: locationsToCheckInCurrentGroup[0].x,
                  y: locationsToCheckInCurrentGroup[0].y-1
                }
    
                locationsToCheckInCurrentGroup.push(newLocation);
                diskCopy[locationsToCheckInCurrentGroup[0].x][locationsToCheckInCurrentGroup[0].y-1] = 2;
              }
              
              if (locationsToCheckInCurrentGroup[0].y+1 < 128 &&
                this._disk[locationsToCheckInCurrentGroup[0].x][locationsToCheckInCurrentGroup[0].y+1] === 1 &&
                diskCopy[locationsToCheckInCurrentGroup[0].x][locationsToCheckInCurrentGroup[0].y+1] !== 2) {
                const newLocation = <iLocation> {
                  x: locationsToCheckInCurrentGroup[0].x,
                  y: locationsToCheckInCurrentGroup[0].y+1
                }
    
                locationsToCheckInCurrentGroup.push(newLocation);
                diskCopy[locationsToCheckInCurrentGroup[0].x][locationsToCheckInCurrentGroup[0].y+1] = 2;
              }

              locationsInCurrentGroup.push({ x: locationsToCheckInCurrentGroup[0].x, y: locationsToCheckInCurrentGroup[0].y })
              locationsToCheckInCurrentGroup = locationsToCheckInCurrentGroup.slice(1);
            }

            if (locationsInCurrentGroup.length > 0) {
              this.answer++;
            }
          }
        }
      }





    }
  }

  interface iLocation {
    x: number,
    y: number
  }