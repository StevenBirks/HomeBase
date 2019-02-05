import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day9',
  templateUrl: './day9.component.html'
})
export class Day9_2018Component implements OnInit {
  public inputString: string;
  public answer: number;

  private _players: iPlayer[];
  private _biggestMarble: number;
  private _marbles: number[];
  private _currentMarblePosition: number;
  private _currentPlayer: iPlayer;

  constructor() { }

  ngOnInit() {
  };

  public calculate(): void {

    this.init();

    for (let i = 0; i < this._biggestMarble + 1; i++) {
      this.placeMarble(i);
      this.iterateCurrentPlayer();
      console.log(i);
    }

    this.answer = this.findMaxPlayerScore();
  } 

  private init() {
    
    this._players = new Array<iPlayer>();
    this._biggestMarble = Number.parseInt(this.inputString.split(" ")[6], 10);
    this._marbles = new Array<number>();
    this._currentMarblePosition = null;

    for (let i = 0; i < Number.parseInt(this.inputString.split(" ")[0], 10); i++) {
      const newPlayer = <iPlayer> {
        ref: i,
        score: 0
      }

      this._players.push(newPlayer);
    }

    this._currentPlayer = this._players[0];
  }

  private placeMarble(value: number) {
    if (value !== 0 && (value % 23 === 0)) {
      this._currentPlayer.score += value;
      this.removeMarble();  
    }
    else {
      this.positionMarble(value);     
    }
  }

  private positionMarble(value) {
    if (value === 0) {
      this._marbles.push(value);
      this._currentMarblePosition = 0;
    } else {
      if (this._currentMarblePosition === (this._marbles.length -1)) {
        this._marbles.splice(1, 0, value);
        this._currentMarblePosition = 1;
      } else {
        this._marbles.splice(this._currentMarblePosition + 2, 0, value);
        this._currentMarblePosition += 2;
      }
    }
  }

  private removeMarble() {
    let index = 0;
    if (this._currentMarblePosition > 5) {
      index = this._currentMarblePosition - 7;
    } else {
      index = this._marbles.length + this._currentMarblePosition -7;
    }

    this.removeMarbleAtIndex(index);
    this._currentMarblePosition = index;
  }

  private removeMarbleAtIndex(index: number) {
    this._currentPlayer.score += this._marbles[index];
    this._marbles.splice(index, 1);
  }

  private iterateCurrentPlayer() {
    if (this._currentPlayer.ref === this._players.length - 1) {
      this._currentPlayer = this._players[0];
    } else {
      this._currentPlayer = this._players[this._currentPlayer.ref + 1];
    }
  }

  private findMaxPlayerScore(): number {
    let highestScore = 0;

    this._players.forEach((player) => {
      if (player.score > highestScore) {
        highestScore = player.score;
      }
    })

    return highestScore;
  }
}

interface iPlayer {
  ref: number,
  score: number
}
