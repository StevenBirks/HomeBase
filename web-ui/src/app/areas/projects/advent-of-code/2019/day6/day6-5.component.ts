import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2019-day6-5',
  templateUrl: './day6-5.component.html'
})
export class Day6_5_2019Component implements OnInit {
  public inputString: string;
  public answer: number;

  private _orbitals: iOrbit[];

  private _youChain: iOrbit[];
  private _sanChain: iOrbit[];

  constructor() { }

  ngOnInit() {
  };

  public calculate(): void {
    this._orbitals = new Array<iOrbit>();
    this._youChain = new Array<iOrbit>();
    this._sanChain = new Array<iOrbit>();

    this.inputString.split("\n").forEach((value) => {
      let orbital = {
        orbits: value.split(")")[1],
        orbited: value.split(")")[0]
      } as iOrbit;

      this._orbitals.push(orbital);
    });

    const sanOrbital = this._orbitals.find((orbital) => {
      return orbital.orbits === "SAN";
    })

    const youOrbital = this._orbitals.find((orbital) => {
      return orbital.orbits === "YOU";
    })

    this.createChain(sanOrbital, this._sanChain);
    this.createChain(youOrbital, this._youChain);

    console.log(this._youChain);
    console.log(this._sanChain);

    this.answer = this.findDistancesToNearestOrbital();
  }

  private createChain(orbital: iOrbit, chain: iOrbit[]) {
    let orbitalChainMember = orbital;

    while(orbitalChainMember !== undefined) {
      orbitalChainMember = this.findNextOrbital(orbitalChainMember);
      if (orbitalChainMember !== undefined) {
        chain.push(orbitalChainMember);
      }
    };
  }

  private findDistancesToNearestOrbital(): number {
    let youCount = 0;
    let santaCount = 0;
    let matchingOrbital = "";

    let i = 0;
    while (matchingOrbital === "" && i <= this._youChain.length) {
      let matches = this._sanChain.filter((orbital) => {
        return orbital.orbited === this._youChain[i].orbited;
      });

      if (matches.length > 0) {
        matchingOrbital = this._youChain[i].orbited;
        youCount = i;
      }

      i++
    }

    santaCount = this._sanChain.findIndex((orbital) => {
      return orbital.orbited === matchingOrbital;
    })

    return youCount + santaCount + 2;
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