import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day20',
  templateUrl: './day20.component.html'
})
export class Day20Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;

  private _particles: iParticle[];
  private _closestParticleIndex: number;
  private _newClosestParticleIndex: number;

  ngOnInit() {
  }

  public calculate(): void {
    this._particles = new Array<iParticle>();
    var rowsString = this.inputString.split("\n");

    for (const row of rowsString) {
      let rowItemsArrayString = row.split(", ");
      let newPosition = <iPosition>{
        x: Number.parseInt(rowItemsArrayString[0].split(",")[0].substr(3)),
        y: Number.parseInt(rowItemsArrayString[0].split(",")[1]),
        z: Number.parseInt(rowItemsArrayString[0].split(",")[2].substr(0, rowItemsArrayString[0].split(",")[2].length - 1))
      }

      let newVelocity = <iVelocity>{
        x: Number.parseInt(rowItemsArrayString[1].split(",")[0].substr(3)),
        y: Number.parseInt(rowItemsArrayString[1].split(",")[1]),
        z: Number.parseInt(rowItemsArrayString[1].split(",")[2].substr(0, rowItemsArrayString[1].split(",")[2].length - 1))
      }

      let newAcceleration = <iAcceleraction>{
        x: Number.parseInt(rowItemsArrayString[2].split(",")[0].substr(3)),
        y: Number.parseInt(rowItemsArrayString[2].split(",")[1]),
        z: Number.parseInt(rowItemsArrayString[2].split(",")[2].substr(0, rowItemsArrayString[2].split(",")[2].length - 1))
      }

      let newParticle = <iParticle>{
        position: newPosition,
        velocity: newVelocity,
        acceleration: newAcceleration
      }

      this._particles.push(newParticle);
    }

    this._closestParticleIndex = -1;
    this._newClosestParticleIndex = -2;
    let sameCount = 0;

    while (this._closestParticleIndex !== this._newClosestParticleIndex) {
      this._particles.forEach((particle) => {
        particle.velocity.x += particle.acceleration.x;
        particle.velocity.y += particle.acceleration.y;
        particle.velocity.z += particle.acceleration.z;

        particle.position.x += particle.velocity.x;
        particle.position.y += particle.velocity.y;
        particle.position.z += particle.velocity.z;
      });

      let closestNow = this._findClosestParticle();

      if (closestNow === this._newClosestParticleIndex) {
        sameCount++;
        if (sameCount > 100000) {
          this._closestParticleIndex = this._newClosestParticleIndex;
        }
      } else {
        this._newClosestParticleIndex = closestNow;
        sameCount = 0;
      }
    }

    this.answer = this._closestParticleIndex;
  }

  private _findClosestParticle(): number {
    let closest = 0;
    let closestCount = 0;

    for (let i = 0; i < this._particles.length; i++) {
      if (i === 0) {
        closestCount = Math.abs(this._particles[i].position.x) + Math.abs(this._particles[i].position.y) + Math.abs(this._particles[i].position.z);
      } else {
        if (closestCount > Math.abs(this._particles[i].position.x) + Math.abs(this._particles[i].position.y) + Math.abs(this._particles[i].position.z)) {
          closestCount = Math.abs(this._particles[i].position.x) + Math.abs(this._particles[i].position.y) + Math.abs(this._particles[i].position.z);
          closest = i;
        }
      }
    }

    return closest;
  }
}

interface iParticle {
  position: iPosition,
  velocity: iVelocity,
  acceleration: iAcceleraction
}

interface iPosition {
  x: number,
  y: number,
  z: number
}

interface iVelocity {
  x: number,
  y: number,
  z: number
}

interface iAcceleraction {
  x: number,
  y: number,
  z: number
}

