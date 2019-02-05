import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-2018-day11',
  templateUrl: './day11.component.html'
})
export class Day11_2018Component implements OnInit {

  constructor() { }

  public inputNumber: number;
  public answer: string;

  private _fuelCells: iFuelCell[];


  ngOnInit() {
    this.inputNumber = 3031;
  }

  public calculate(): void {
    this.init()
    this.calculatePower();
    this.answer = this.findGridRefMax();    
  }

  private findGridRefMax(): string {
    const maxFuelCell = <iFuelCell> {
      power: 0,
      x: 0, 
      y: 0
    }

    for (let i = 1; i < 301 * 297; i++) {
      if ((i+2) % 300 === 0) {
        i += 2;
      } else {
        let power = this._fuelCells[i].power + 
        this._fuelCells[i+1].power +
        this._fuelCells[i+2].power + 
        this._fuelCells[i+300].power +
        this._fuelCells[i+301].power +
        this._fuelCells[i+302].power +
        this._fuelCells[i+600].power +
        this._fuelCells[i+601].power +
        this._fuelCells[i+602].power;

        if (power > maxFuelCell.power) {
          maxFuelCell.x = this._fuelCells[i].x,
          maxFuelCell.y = this._fuelCells[i].y,
          maxFuelCell.power = power;
          console.log("max power: ", power);
        }
      }
    }

    return `${maxFuelCell.x},${maxFuelCell.y}`;
  }

  private calculatePower() {
    this._fuelCells.forEach((cell) => {
      const rackId = cell.x + 10;
      cell.power = (rackId * cell.y)
      cell.power += this.inputNumber;
      cell.power *= rackId;
      const l = Math.pow(10, Math.floor(Math.log(cell.power)/Math.log(10))-(cell.power.toString().length - 3));
      const b = Math.floor(cell.power/l);
      const digit = b-Math.floor(b/10)*10;
      cell.power = digit -5;
    })
  }

  private init() {
    this._fuelCells = new Array<iFuelCell>();

    for (let i = 1; i < 301; i++) {
      for (let j = 1; j < 301; j++) {
        let newFuelCell = <iFuelCell> {
          x: j,
          y: i,
          power: 0
        }

        this._fuelCells.push(newFuelCell);
      }
    }
  }
}

interface iFuelCell {
  x: number,
  y: number,
  power: number
}
