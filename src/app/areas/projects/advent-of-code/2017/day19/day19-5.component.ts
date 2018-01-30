import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day19-5',
  templateUrl: './day19-5.component.html'
})
export class Day19_5Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: string;

  private _diagram: string[][];
  private _position: iPosition;
  private _direction: direction;
  private _continue: boolean;
  private _lettersEncountered: string[];
  private _stepCount: number;
  
  ngOnInit() {
  }

  public calculate(): void {
    var rowsString = this.inputString.split("\n");
    this._diagram = new Array<Array<string>>();
    this._lettersEncountered = new Array<string>();

    for (const row of rowsString) {
      const rowItemsArrayString = row.split("");
      if (rowItemsArrayString.length > 0) {
        this._diagram.push(rowItemsArrayString);
      }
    }

    this._position = <iPosition> {
      x: 1,
      y: 0
    };

    this._direction = direction.down;
    this._continue = true;
    this._stepCount = 1;

    while (this._continue) {
      if (this._direction === direction.down) {
        this._position.y++;
      } else if(this._direction === direction.up) {
        this._position.y--;
      } else if(this._direction === direction.left) {
        this._position.x--;
      } else {
        this._position.x++;
      }

      this._updateDirection();
      this._letterCheck();

      this._stepCount++;
    }

    this.answer = this._stepCount.toString();

  } 

  private _letterCheck(): void {
    if (this._diagram[this._position.y][this._position.x].charCodeAt(0) > 64 && 
        this._diagram[this._position.y][this._position.x].charCodeAt(0) < 91) {
      this._lettersEncountered.push(this._diagram[this._position.y][this._position.x]);
    }
  }

  private _updateDirection(): void {
    if (this._direction === direction.down || this._direction === direction.up) {
      // keep going down/up unless you encounter a '+'
      if (this._diagram[this._position.y][this._position.x].charCodeAt(0) === 43) {
        if (this._position.x > 0 && 
          (this._diagram[this._position.y][this._position.x-1].charCodeAt(0) === 45 ||
           (this._diagram[this._position.y][this._position.x-1].charCodeAt(0) < 91 &&
            this._diagram[this._position.y][this._position.x-1].charCodeAt(0) > 64 &&
            this._lettersEncountered.indexOf(this._diagram[this._position.y][this._position.x-1]) === -1))) {
          this._direction = direction.left;
        } else {
          this._direction = direction.right;
        }
      }

      if (this._direction === direction.up) {
        if (this._diagram[this._position.y-1][this._position.x].charCodeAt(0) === 32) {
          this._continue = false;
        }
      }

      if (this._direction === direction.down) {
        if (this._diagram[this._position.y+1][this._position.x].charCodeAt(0) === 32) {
          this._continue = false;
        }
      }
    } else  {
      // keep going left/right unless you encounter a '+'
      if (this._diagram[this._position.y][this._position.x].charCodeAt(0) === 43) {
        if (this._position.y > 0 && 
          (this._diagram[this._position.y-1][this._position.x].charCodeAt(0) === 124 ||
           (this._diagram[this._position.y-1][this._position.x].charCodeAt(0) < 91 &&
            this._diagram[this._position.y-1][this._position.x].charCodeAt(0) > 64 &&
            this._lettersEncountered.indexOf(this._diagram[this._position.y-1][this._position.x]) === -1))) {
          this._direction = direction.up;
        } else {
          this._direction = direction.down;
        }
      }

      if (this._direction === direction.right) {
        if (this._diagram[this._position.y][this._position.x+1].charCodeAt(0) === 32) {
          this._continue = false;
        }
      }

      if (this._direction === direction.left) {
        if (this._diagram[this._position.y][this._position.x-1].charCodeAt(0) === 32) {
          this._continue = false;
        }
      }
    }
  }
}

interface iPosition {
  x: number,
  y: number
}

enum direction {
  up,
  down,
  left,
  right
}
