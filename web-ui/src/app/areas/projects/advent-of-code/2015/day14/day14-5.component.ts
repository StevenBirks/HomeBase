import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day14-5',
  templateUrl: './day14-5.component.html'
})
export class Day14_5_2015Component implements OnInit {
  constructor() { }

  public inputString: string;
  public duration: number;
  public answer: number;

  private _reindeers: iReindeer[];

  ngOnInit() {
    this.duration = 2503;
  }

  public calculate(): void {

    var inputRows = this.inputString.split("\n");
    this._reindeers = new Array<iReindeer>();

    inputRows.forEach((row) => {
      const rowSplit = row.split(" ");      

      let reindeer = <iReindeer>{
        name: rowSplit[0],
        speed: Number.parseInt(rowSplit[3], 10),
        speedLength: Number.parseInt(rowSplit[6], 10),
        restLength: Number.parseInt(rowSplit[13], 10),
        distance: 0,
        points: 0
      };

      this._reindeers.push(reindeer);
    });

    for (let i = 1; i <= 2503; i++) {
      this.MoveReindeers(i);
      this.GivePoints();
    }

    this.answer = this._reindeers.reduce((prev, curr) => {
      return prev.points > curr.points ? prev : curr;
    }).points;
  }

  private MoveReindeers(second: number) {
    this._reindeers.forEach((reindeer) => {
      const state = this.FindState(second, reindeer);

      if (state === iState.fly) {
        reindeer.distance += reindeer.speed;
      }
    })
  }

  private FindState(second: number, reindeer: iReindeer) {
    let state = iState.unknown;
    while(state === iState.unknown) {
      second -= reindeer.speedLength;

      if (second <= 0) {
        state = iState.fly;
      }

      if (state === iState.unknown) {
        second -= reindeer.restLength;

        if (second <= 0) {
          state = iState.rest;
        }
      }
    }

    return state;
  }

  private GivePoints() {
    const maxDistance = this.FindMaxDistance();

    this._reindeers.forEach((reindeer) => {
      if (reindeer.distance === maxDistance) {
        reindeer.points++;
      }
    })
  }

  private FindMaxDistance(): number {
    const maxDistance = this._reindeers.reduce((prev, curr) => {
      return prev.distance > curr.distance ? prev : curr;
    }).distance;

    return maxDistance;
  }
}

interface iReindeer {
  name: string,
  speed: number,
  speedLength: number,
  restLength: number,
  distance: number,
  points: number
}

enum iState {
  unknown,
  rest,
  fly
}