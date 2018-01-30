import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day3',
  templateUrl: './day3.component.html'
})
export class Day3_2015Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number;

  private _inputArray: string[];

  private _houseLocations: iLocation[];
  private _currentLocation: iLocation;

  ngOnInit() {
  }

  public calculate(): void {
    this._inputArray = new Array<string>();
    this._inputArray = this.inputString.split("");

    this._houseLocations = new Array<iLocation>();

    this._currentLocation = <iLocation>{
      x: 0,
      y: 0
    };

    this._houseLocations.push(<iLocation>{
      x: 0,
      y: 0
    });

    this._inputArray.forEach((input) => {
      switch (input) {
        case '^':
          this._currentLocation.y++;
          break;
        case 'v':
          this._currentLocation.y--;
          break;
        case '<':
          this._currentLocation.x--;
          break;
        case '>':
          this._currentLocation.x++;
          break;
        default:
          break;
      }

      if (this._houseLocations.find((location) => {
        return location.x === this._currentLocation.x &&
          location.y === this._currentLocation.y;
      }) === undefined) {
        this._houseLocations.push(<iLocation>{
          x: this._currentLocation.x,
          y: this._currentLocation.y
        });
      }
    });

    this.answer = this._houseLocations.length;
  }
}

interface iLocation {
  x: number,
  y: number,
}
