import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-2019-day12',
  templateUrl: './day12.component.html'
})
export class Day12_2019Component implements OnInit {

  constructor() { }

  public answer: number;
  public inputString: string;
  private _moons: iMoon[];

  ngOnInit() {
  }

  public calculate(): void {
    this.init();

    for (let i = 0; i < 1000; i++) {
      this.iterate();
    }

    this.answer = this.calculateEnergy();
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

  private calculateEnergy(): number {
    let energy = 0;

    this._moons.forEach((moon) => {
      energy += (Math.abs(moon.px) + Math.abs(moon.py) + Math.abs(moon.pz)) *
        (Math.abs(moon.vx) + Math.abs(moon.vy) + Math.abs(moon.vz));
    });

    return energy;
  }

  private init() {
    this._moons = new Array<iMoon>();
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
