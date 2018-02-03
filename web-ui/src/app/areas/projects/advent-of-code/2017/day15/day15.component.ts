import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day15',
  templateUrl: './day15.component.html'
})
export class Day15Component implements OnInit {

  constructor() {
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
  private _generatorABinary: number[];
  private _generatorBBinary: number[];
  private _generatorAFactor: number;
  private _generatorBFactor: number;
  
  ngOnInit() {
  }

  public calculate(): void {
    this.answer = 0;
    this._count = 0;
    this._generatorAValue = this.inputA;
    this._generatorBValue = this.inputB;
    this._generatorABinary = [];
    this._generatorBBinary = [];
    this._run();
  }

  private _run(): void {
    if (this._count < 40000000) {
      let i = 0;
      while (i < 1000) {
        this._generatorAValue = (this._generatorAValue * this._generatorAFactor) % 2147483647;
        this._generatorBValue = (this._generatorBValue * this._generatorBFactor) % 2147483647;

        this._generatorABinary = [];
        this._generatorBBinary = [];

        this._generatorABinary = this._generatorAValue
          .toString(2)
          .padStart(64, "0")
          .split("")
          .map((bit) => {
            return Number.parseInt(bit);
        });

        this._generatorBBinary = this._generatorBValue
          .toString(2)
          .padStart(64, "0")
          .split("")
          .map((bit) => {
            return Number.parseInt(bit);
        });

        let match = true;
        let z = 48;

        while (match && z < 64) {
          if (this._generatorABinary[z] !== this._generatorBBinary[z]) {
            match = false;
          }

          z++;
        }

        if (match) {
          this.answer++
        }

        this._count++
        i++;
      }
            
      setTimeout(() => {
        this._run();
        this.finished = `${100 * this._count / 40000000}%`;
      } , 5);
    }
  }
}