import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day3-5',
  templateUrl: './day3-5.component.html'
})
export class Day3_5_2015Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number;

  private _inputArray: string[];

  private _houseLocations: iLocation[];
  private _santaCurrentLocation: iLocation;
  private _roboSantaCurrentLocation: iLocation;

  ngOnInit() {
  }

  public calculate(): void {
    this._inputArray = new Array<string>();
    this._inputArray = this.inputString.split("");

    this._houseLocations = new Array<iLocation>();

    this._santaCurrentLocation = <iLocation>{
      x: 0,
      y: 0
    };

    this._roboSantaCurrentLocation = <iLocation>{
      x: 0,
      y: 0
    };

    this._houseLocations.push(<iLocation>{
      x: 0,
      y: 0
    });

    for (let i = 0; i < this._inputArray.length; i++) {
      switch (this._inputArray[i]) {
        case '^':
          i % 2 === 0
            ? this._santaCurrentLocation.y++
            : this._roboSantaCurrentLocation.y++;
          break;
        case 'v':
          i % 2 === 0
            ? this._santaCurrentLocation.y--
            : this._roboSantaCurrentLocation.y--;
          break;
        case '<':
          i % 2 === 0
            ? this._santaCurrentLocation.x--
            : this._roboSantaCurrentLocation.x--;
          break;
        case '>':
          i % 2 === 0
            ? this._santaCurrentLocation.x++
            : this._roboSantaCurrentLocation.x++;
          break;
        default:
          break;
      }

      if (this._houseLocations.find((location) => {
        let thing = i % 2 === 0
          ? (location.x === this._santaCurrentLocation.x &&
            location.y === this._santaCurrentLocation.y)
          : (location.x === this._roboSantaCurrentLocation.x &&
            location.y === this._roboSantaCurrentLocation.y);
        return thing;
      }) === undefined) {
        this._houseLocations.push(<iLocation>{
          x: i % 2 === 0
            ? this._santaCurrentLocation.x
            : this._roboSantaCurrentLocation.x,
          y: i % 2 === 0
            ? this._santaCurrentLocation.y
            : this._roboSantaCurrentLocation.y
        });
      }
    }

    this.answer = this._houseLocations.length;
  }
}

interface iLocation {
  x: number,
  y: number,
}
