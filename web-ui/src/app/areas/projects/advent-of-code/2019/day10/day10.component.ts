import { Component } from '@angular/core';

@Component({
  selector: 'app-2019-day10',
  templateUrl: './day10.component.html'
})
export class Day10_2019Component {

  constructor() { }

  public inputString: string;
  public answer;

  private _asteroids: iAsteroid[];

  public calculate(): void {
    this.init()

    this.iterateAsteroids();
  }

  private init() {
    this._asteroids = new Array<iAsteroid>();
    this.answer = 0;
    for (let i = 0; i < this.inputString.split("\n").length; i++) {
      const row = this.inputString.split("\n")[i];
      for (let j = 0; j < this.inputString.split("\n")[0].length; j++) {
        if (row[j] === "#") {
          this._asteroids.push(<iAsteroid>{
            anglesToOthers: new Array<number>(),
            x: j,
            y: i
          })
        }
      }
    }
  }

  private iterateAsteroids() {
    this._asteroids.forEach((asteroid) => {
      const otherAsteroids = this._asteroids.filter((ast) => {
        return ast.x !== asteroid.x || ast.y !== asteroid.y;
      });

      otherAsteroids.forEach((ast) => {
        const xDiff = ast.x - asteroid.x;
        const yDiff = asteroid.y - ast.y;

        let angle = -999;

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
        asteroid.anglesToOthers.push(angle);
      })

      const distinct = (value, index, self) => {
        return self.indexOf(value) === index;
      }

      asteroid.anglesToOthers = asteroid.anglesToOthers.filter(distinct);

      if (asteroid.anglesToOthers.length > this.answer) {
        this.answer = asteroid.anglesToOthers.length;
      }
    })
  }

  private toDegrees(angle: number): number {
    return angle * (180 / Math.PI);
  }
}

interface iAsteroid {
  x: number,
  y: number,
  anglesToOthers: number[],
}
