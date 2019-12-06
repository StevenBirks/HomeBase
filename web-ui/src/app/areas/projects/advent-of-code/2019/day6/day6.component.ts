import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2019-day6',
  templateUrl: './day6.component.html'
})
export class Day6_2019Component implements OnInit {
  public inputString: string;
  public answer: number;

  private _orbitals: iOrbit[];

  private _count: number;

  constructor() { }

  ngOnInit() {
  };

  public calculate(): void {
    this._orbitals = new Array<iOrbit>();
    this._count = 0;

    this.inputString.split("\n").forEach((value) => {
      let orbital = {
        orbits: value.split(")")[1],
        orbited: value.split(")")[0]
      } as iOrbit;

      this._orbitals.push(orbital);
    });

    console.log(this._orbitals);

    this._orbitals.forEach((orbital) => {
      let orbitalChain = orbital;
      while(orbitalChain !== undefined) {
        this._count++;
        orbitalChain = this.findNextOrbital(orbitalChain);
      };
    })

    this.answer = this._count;
  }

  private findNextOrbital(orbital: iOrbit): iOrbit {
    return this._orbitals.find((orbit) => {
      return orbit.orbits === orbital.orbited;
    });
  }
}

interface iOrbit {
  orbits: string,
  orbited: string
}