import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day15-5',
  templateUrl: './day15-5.component.html'
})
export class Day15_5Component implements OnInit {

  constructor() {
    this.inputA = 289;
    this.inputB = 629;

    this._generatorAFactor = 16807;
    this._generatorBFactor = 48271;
   }

  public inputA: number;
  public inputB: number;
  public answer: number;
  public finished: string;
  private _count: number;
  private _generatorAValue: number;
  private _generatorBValue: number;
  private _generatorABinary: number[]
  private _generatorBBinary: number[]
  private _generatorAFactor: number;
  private _generatorBFactor: number;
  
  ngOnInit() {
  }

  public calculate(): void {
    this.answer = 0;
    this._count = 0;
    this._generatorAValue = this.inputA;
    this._generatorBValue = this.inputB;

    this._run();
  }

  private _run(): void {
    let i = 0;
    while (i < 1000) {

      this._generatorABinary = new Array<number>();
      this._generatorBBinary = new Array<number>();

      while (this._generatorABinary.length === 0) {
        this._generatorAValue = (this._generatorAValue * this._generatorAFactor) % 2147483647;     

        if (this._generatorAValue % 4 === 0) {          
          this._generatorABinary = this._generatorAValue
            .toString(2)
            .padStart(64, "0")
            .split("")
            .slice(48)
            .map((bit) => {
              return Number.parseInt(bit);
            });
          }
      }

      while (this._generatorBBinary.length === 0) {
        this._generatorBValue = (this._generatorBValue * this._generatorBFactor) % 2147483647;
        if (this._generatorBValue % 8 === 0) {
          this._generatorBBinary = this._generatorBValue
            .toString(2)
            .padStart(64, "0")
            .split("")
            .slice(48)
            .map((bit) => {
              return Number.parseInt(bit);
          });
        }
      } 

      this._judge();

      this._count++    
      i++;
    }
          
    setTimeout(() => {
      if (this._count < 5000000) {
        this._run();
      }
      this.finished = `${100 * this._count / 5000000}%`;
    } , 5);

  }

  private _judge():void {
    let match = true;
    let z = 0;

    while (match && z < 16) {
      if (this._generatorABinary[z] !== this._generatorBBinary[z]) {
        match = false;
      }

      z++;
    }

    if (match) {
      this.answer++
    }    
  }
}