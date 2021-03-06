import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day4-5',
  templateUrl: './day4-5.component.html'
})
export class Day4_5_2018Component implements OnInit {
  public inputString: string;
  public answer: number;

  private _minutes: iMinute[];
  private _guards: iGuard[];
  private _currentGuard: number;
  private _startsSleeping: number;

  constructor() { }

  ngOnInit() {
  };

  public calculate(): void {
    this.initiateHour();

    this._guards = new Array<iGuard>();
    let inputRows = this.inputString.split("\n").sort();

    inputRows.forEach((row) => {
      if (row.includes("begins shift")) {
        this._currentGuard = Number.parseInt(row.split(" ")[3].replace('#', ''));
        if (this._guards.filter((guard) => {
          return guard.id === Number.parseInt(row.split(" ")[3].replace('#', ''));
        }).length === 0) {
          this._guards.push(<iGuard>{ id: Number.parseInt(row.split(" ")[3].replace('#', '')), sleepyCount: 0 });
        }
      } else if (row.includes("falls asleep")) {
        this._startsSleeping = Number.parseInt(row.split(" ")[1].replace(']', '').split(':')[1]);
      } else {
        this.iterateSleepingPeriod(Number.parseInt(row.split(" ")[1].replace(']', '').split(':')[1]));
        this._startsSleeping = null;
      }
    });

    this.answer = this.findSleepyGuard();
  }

  private initiateHour() {
    this._minutes = new Array<iMinute>();

    for (let i = 0; i < 60; i++) {
      this._minutes.push(<iMinute>{ guardsAsleep: new Array<number>(), hour: 0, minute: i });
    }
  }

  private iterateSleepingPeriod(wakesUp: number) {
    for (let i = this._startsSleeping; i < wakesUp; i++) {
      this._minutes[i].guardsAsleep.push(this._currentGuard);
    }
  }

  private findSleepyGuard(): number {
    let maxGuardId = 0;
    let maxMinute = 0;
    let maxGuardCount = 0;
    this._minutes.forEach((minute) => {
      const guard = minute.guardsAsleep.sort((a, b) =>
        minute.guardsAsleep.filter(v => v === a).length
        - minute.guardsAsleep.filter(v => v === b).length
      )[minute.guardsAsleep.length - 1];

      const guardCount = minute.guardsAsleep.filter((guardInner) => {
        return guardInner === guard;
      }).length;

      if (guardCount > maxGuardCount) {
        maxGuardId = guard;
        maxMinute = minute.minute;
        maxGuardCount = guardCount;
      }
    })

    return maxGuardId * maxMinute;
  }
}

interface iMinute {
  hour: number,
  minute: number,
  guardsAsleep: number[];
}

interface iGuard {
  id: number;
  sleepyCount: number;
}
