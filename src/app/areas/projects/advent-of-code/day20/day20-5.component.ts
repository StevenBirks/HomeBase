import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day20-5',
  templateUrl: './day20-5.component.html'
})
export class Day20_5Component implements OnInit {

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
        acceleration: newAcceleration,
        collided: false
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

      this._collisionDetectAndUpdate();

      let closestNow = this._findClosestParticle();

      if (closestNow === this._newClosestParticleIndex) {
        sameCount++;
        if (sameCount > 10000) {
          this._closestParticleIndex = this._newClosestParticleIndex;
        }
      } else {
        this._newClosestParticleIndex = closestNow;
        sameCount = 0;
      }
    }

    this.answer = this._particles.filter((particle) => {
      return !particle.collided;
    }).length;
  }

  private _findClosestParticle(): number {
    let closest = 0;
    let closestCount = 100000000000;

    for (let i = 0; i < this._particles.length; i++) {
      if (!this._particles[i].collided) {
        if (closestCount > Math.abs(this._particles[i].position.x) + Math.abs(this._particles[i].position.y) + Math.abs(this._particles[i].position.z)) {
          closestCount = Math.abs(this._particles[i].position.x) + Math.abs(this._particles[i].position.y) + Math.abs(this._particles[i].position.z);
          closest = i;
        }
      }      
    }
    
    return closest;
  }

  private _collisionDetectAndUpdate(): void {
    this._particles.forEach((particle1) => {
      if (!particle1.collided) {
        if (this._particles.filter((particle2) => {
          return particle1.position.x === particle2.position.x &&
                 particle1.position.y === particle2.position.y &&
                 particle1.position.z === particle2.position.z;
        }).length > 1) {
          particle1.collided = true;
          console.log(
            this._particles.filter((particle) => {
              return !particle.collided;
            }).length);
        }
      }
    })
  }  
}

interface iParticle {
  position: iPosition,
  velocity: iVelocity,
  acceleration: iAcceleraction,
  collided: boolean
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
