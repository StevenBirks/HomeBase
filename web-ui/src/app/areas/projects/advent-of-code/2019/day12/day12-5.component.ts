import { Component } from '@angular/core';

@Component({
  selector: 'app-2019-day12-5',
  templateUrl: './day12-5.component.html'
})
export class Day12_5_2019Component {

  constructor() { }

  public answer: number;
  public inputString: string;
  private _moons: iMoon[];

  private _xStates: Set<string>;
  private _yStates: Set<string>;
  private _zStates: Set<string>;

  private _xSteps: number;
  private _ySteps: number;
  private _zSteps: number;

  public calculate(): void {
    this.init();
    let step = 0;

    this._xSteps = 0;
    this._ySteps = 0;
    this._zSteps = 0;

    let xfound = false;
    let yfound = false;
    let zfound = false;

    while (!xfound || !yfound || !zfound) {
      this.iterate();

      if (!xfound) {
        const xstate = `${this._moons[0].px}, ${this._moons[0].vx}, ${this._moons[1].px}, ${this._moons[1].vx}, ${this._moons[2].px}, ${this._moons[2].vx}, ${this._moons[3].px}, ${this._moons[3].vx}`;
        if (this._xStates.has(xstate)) {
          xfound = true;
          this._xSteps = step;
        } else {
          this._xStates.add(xstate);
        }
      } 

      if (!yfound) {
        const ystate = `${this._moons[0].py}, ${this._moons[0].vy}, ${this._moons[1].py}, ${this._moons[1].vy}, ${this._moons[2].py}, ${this._moons[2].vy}, ${this._moons[3].py}, ${this._moons[3].vy}`;
        if (this._yStates.has(ystate) && !yfound) {
          yfound = true;
          this._ySteps = step;
        } else {
          this._yStates.add(ystate);
        }
      }

      if (!zfound) {
        const zstate = `${this._moons[0].pz}, ${this._moons[0].vz}, ${this._moons[1].pz}, ${this._moons[1].vz}, ${this._moons[2].pz}, ${this._moons[2].vz}, ${this._moons[3].pz}, ${this._moons[3].vz}`;
        if (this._zStates.has(zstate)) {
          zfound = true;
          this._zSteps = step;
        } else {
          this._zStates.add(zstate);
        }
      }

      step++;
    }

    const gcd = (a, b) => a ? gcd(b % a, a) : b;
    const lcm = (a, b) => a * b / gcd(a, b);

    this.answer =  [this._xSteps, this._ySteps, this._zSteps].reduce(lcm);
  }

  private iterate() {
    const newMoonsJson = JSON.stringify(this._moons);
    let newMoons = JSON.parse(newMoonsJson) as iMoon[];

    for (let i = 0; i < this._moons.length - 1; i++) {
      for (let j = i + 1; j < this._moons.length; j++) {
        this.processMoonVel(newMoons[i], newMoons[j], this._moons[i], this._moons[j]);
      }
    }

    for (let i = 0; i < this._moons.length; i++) {
      this.processMoonPos(newMoons[i]);
    }

    this._moons = newMoons;
  }

  private processMoonVel(newMoon1: iMoon, newMoon2: iMoon, moon1: iMoon, moon2: iMoon) {
    let moonXDiff = moon1.px < moon2.px ? 1 : moon1.px > moon2.px ? -1 : 0;
    let moonYDiff = moon1.py < moon2.py ? 1 : moon1.py > moon2.py ? -1 : 0;
    let moonZDiff = moon1.pz < moon2.pz ? 1 : moon1.pz > moon2.pz ? -1 : 0;

    newMoon1.vx += moonXDiff;
    newMoon2.vx -= moonXDiff;
    newMoon1.vy += moonYDiff;
    newMoon2.vy -= moonYDiff;
    newMoon1.vz += moonZDiff;
    newMoon2.vz -= moonZDiff;
  }

  private processMoonPos(moon: iMoon) {
    moon.px += moon.vx;
    moon.py += moon.vy;
    moon.pz += moon.vz;
  }

  private init() {
    this._moons = new Array<iMoon>();
    this._xStates = new Set<string>();
    this._yStates = new Set<string>();
    this._zStates = new Set<string>();

    this.inputString.split('\n').forEach((moon) => {
      const coords = moon.split(",");

      let newMoon = {
        px: Number.parseInt(coords[0].split("=")[1]),
        py: Number.parseInt(coords[1].split("=")[1]),
        pz: Number.parseInt(coords[2].split("=")[1]),
        vx: 0,
        vy: 0,
        vz: 0
      } as iMoon;

      this._moons.push(newMoon);
    });
  }
}

interface iMoon {
  px: number;
  py: number;
  pz: number;
  vx: number;
  vy: number;
  vz: number;
}
