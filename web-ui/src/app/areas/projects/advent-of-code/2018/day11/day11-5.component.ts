import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-2018-day11-5',
  templateUrl: './day11-5.component.html'
})
export class Day11_5_2018Component implements OnInit {

  constructor() { }

  public inputNumber: number;
  public answer: string;

  private _fuelCells: iFuelCell[];
  private _maxFuelCell: iFuelCellWS;


  ngOnInit() {
    this.inputNumber = 3031;
  }

  public calculate(): void {
    this.init()
    this.calculatePower();
    this.findGridRefMax(1); 
  }

  private findGridRefMax(gridSize: number) {
    for (let i = 1; i < 301 * (300-gridSize); i++) {
      if ((i+(gridSize-1)) % 300 === 0) {
        i += (gridSize-1);
      } else {
        let power = 0;
        for (let j = 0; j < gridSize; j++) {
          for (let k = 0; k < gridSize; k++) {
            power += this._fuelCells[i+j+(k * 300)].power;
          }
        }

        if (power > this._maxFuelCell.power) {
          this._maxFuelCell.x = this._fuelCells[i].x,
          this._maxFuelCell.y = this._fuelCells[i].y,
          this._maxFuelCell.power = power;
          this._maxFuelCell.size = gridSize;
          console.log("max power: ", power);
          console.log("GridSize:: ", gridSize);
          this.answer = `${this._maxFuelCell.x},${this._maxFuelCell.y},${this._maxFuelCell.size}`;
        }
      }
    }

    if (gridSize < 301) {
      window.setTimeout(() => {
        debugger;
        console.log(gridSize);
        this.findGridRefMax(gridSize+1);
      }, 1)
    }
  }

  private calculatePower() {
    this._fuelCells.forEach((cell) => {
      const rackId = cell.x + 10;
      cell.power = (rackId * cell.y)
      cell.power += this.inputNumber;
      cell.power *= rackId;
      var l = Math.pow(10, Math.floor(Math.log(cell.power)/Math.log(10))-(cell.power.toString().length - 3));
      var b = Math.floor(cell.power/l);
      var digit = b-Math.floor(b/10)*10;
      cell.power = digit -5;
    })
  }

  private init() {
    this._fuelCells = new Array<iFuelCell>();
    this._maxFuelCell = <iFuelCellWS> {
      power: 0,
      x: -1,
      y: -1,
      size: 0
    };

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

interface iFuelCellWS {
  x: number,
  y: number,
  power: number,
  size: number
}
