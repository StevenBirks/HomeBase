import { Component } from '@angular/core';

@Component({
  selector: 'app-2019-day10-5',
  templateUrl: './day10-5.component.html'
})
export class Day10_5_2019Component {

  constructor() { }

  public inputString: string;
  public answer;

  private _asteroids: iAsteroid[];

  private _stationAsteroid: iAsteroid;

  public calculate(): void {
    this.init()
    this.positionStation();
    this.findInRotation(this._stationAsteroid);

    this.sortForClockwise();

    this.answer = (this._stationAsteroid.others[199].x * 100) + this._stationAsteroid.others[199].y;
  }

  private init() {
    this._asteroids = new Array<iAsteroid>();
    this.answer = 0;

    for (let i = 0; i < this.inputString.split("\n").length; i++) {
      const row = this.inputString.split("\n")[i];
      for (let j = 0; j < this.inputString.split("\n")[0].length; j++) {
        if (row[j] === "#") {
          this._asteroids.push(<iAsteroid>{
            others: new Array<iOtherAsteroid>(),
            x: j,
            y: i
          })
        }
      }
    }
  }

  private sortForClockwise() {
    const lessThanOrEqualTo90 = this._stationAsteroid.others.filter((ast) => {
      return ast.angleTo <= 90;
    });

    const between90And360 = this._stationAsteroid.others.filter((ast) => {
      return ast.angleTo > 90;
    });

    const newOrder = lessThanOrEqualTo90.reverse();
    newOrder.push(...between90And360.reverse());

    this._stationAsteroid.others = newOrder;
  }

  private positionStation() {
    let foundAsteroids = 0;
    this._asteroids.forEach((asteroid) => {
      this.findInRotation(asteroid);

      if (asteroid.others.length > foundAsteroids) {
        foundAsteroids = asteroid.others.length;

        this._stationAsteroid = <iAsteroid>{
          anglesToOthers: new Array<iOtherAsteroid>(),
          others: new Array<iOtherAsteroid>(),
          x: asteroid.x,
          y: asteroid.y
        };
      }
    })
  }

  private findInRotation(asteroid: iAsteroid) {
    asteroid.others = new Array<iOtherAsteroid>();

    const otherAsteroids = this._asteroids.filter((ast) => {
      return ast.x !== asteroid.x || ast.y !== asteroid.y;
    });

    otherAsteroids.forEach((ast) => {
      const xDiff = ast.x - asteroid.x;
      const yDiff = asteroid.y - ast.y;

      let angle = null;

      if (yDiff === 0) {
        if (xDiff / Math.abs(xDiff) === -1) {
          angle = Math.PI;
        } else {
          angle = 0;
        }
      } else if (xDiff === 0) {
        if (yDiff / Math.abs(yDiff) === -1) {
          angle = 3 * (Math.PI / 2);
        } else {
          angle = Math.PI / 2;
        }
      } else if (xDiff / Math.abs(xDiff) === 1 && yDiff / Math.abs(yDiff) === -1) {
        angle = Math.atan(yDiff / xDiff);
        angle = angle + (2 * Math.PI);
      } else if (xDiff / Math.abs(xDiff) === -1 && yDiff / Math.abs(yDiff) === 1) {
        angle = Math.atan(yDiff / xDiff);
        angle = Math.PI + angle;
      } else if (xDiff / Math.abs(xDiff) === -1 && yDiff / Math.abs(yDiff) === -1) {
        angle = Math.atan(yDiff / xDiff);
        angle = Math.PI + angle;
      } else {
        angle = Math.atan(yDiff / xDiff);
      }

      angle = this.toDegrees(angle);

      const distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));

      asteroid.others.push(<iOtherAsteroid>{
        angleTo: angle,
        distanceTo: distance,
        x: ast.x,
        y: ast.y
      });
    })

    asteroid.others.sort(this.compareDistance);

    let distinctAsteroidAngles = new Array<iOtherAsteroid>();

    for (let i = 0; i < asteroid.others.length; i++) {
      const preset = distinctAsteroidAngles.find((angle) => {
        return angle.angleTo === asteroid.others[i].angleTo;
      });

      if (preset === undefined) {
        distinctAsteroidAngles.push(asteroid.others[i]);
      }
    }

    asteroid.others = distinctAsteroidAngles;
    asteroid.others.sort(this.compareAngle);
  }

  private compareDistance(asteroid1: iOtherAsteroid, asteroid2: iOtherAsteroid) {
    let comparison = 0;
    if (asteroid1.distanceTo > asteroid2.distanceTo) {
      comparison = 1;
    } else if (asteroid1.distanceTo < asteroid2.distanceTo) {
      comparison = -1;
    }
    return comparison;
  }

  private compareAngle(asteroid1: iOtherAsteroid, asteroid2: iOtherAsteroid) {
    let comparison = 0;
    if (asteroid1.angleTo > asteroid2.angleTo) {
      comparison = 1;
    } else if (asteroid1.distanceTo < asteroid2.angleTo) {
      comparison = -1;
    }
    return comparison;
  }

  private toDegrees(angle: number): number {
    return angle * (180 / Math.PI);
  }
}

interface iAsteroid {
  x: number,
  y: number,
  others: iOtherAsteroid[],
}

interface iOtherAsteroid {
  x: number,
  y: number,
  distanceTo: number,
  angleTo: number
}
