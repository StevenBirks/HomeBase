import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day9',
  templateUrl: './day9.component.html'
})
export class Day9_2015Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number;


  private _distances: iDistance[];
  private _locations: string[];
  private _routes: iRoute[];
  
  ngOnInit() {
  }

  public calculate(): void {
    var inputRows = this.inputString.split("\n");
    this._locations = new Array<string>();
    this._distances = new Array<iDistance>();
    this._routes = new Array<iRoute>();

    inputRows.forEach((row) => {
      let newDistance = <iDistance> {
        location1: row.split(" ")[0],
        location2: row.split(" ")[2],
        distance: Number.parseInt(row.split(" ")[4])
      };

      this._distances.push(newDistance);

      if (this._locations.filter((location) => {
        return location === newDistance.location1;
      }).length === 0) {
        this._locations.push(newDistance.location1);
      }
      if (this._locations.filter((location) => {
        return location === newDistance.location2;
      }).length === 0) {
        this._locations.push(newDistance.location2);
      }
    })

    this.calculateRoutes();

    console.log(this._routes);

    var thing = this._routes.filter((route) => {
      return route.current;
    }).map((route) => {
      return route.distance;
    });

    this.answer = Math.min(...thing);
  }

  private calculateRoutes() {
    this._locations.forEach((location) => {
      let newRoute = <iRoute> {
        startLocation: location,
        currentLocation: location,
        visitedLocations: [location],
        distance: 0,
        current: true
      };

      this._routes.push(newRoute);
    })

    for (let i = 0; i < 7; i++) {
      this._routes.filter((route) => {
        return route.current;
      }).forEach((route) => {
        route.current = false;

        let unvisitedLocations = this._locations.filter((location) => {
          return route.visitedLocations.filter((visitedLocation) => {
            return visitedLocation === location;
          }).length === 0;
        });

        for (let i = 0; i < unvisitedLocations.length; i++) {
          let newRoute = <iRoute> {
            current: true,
            visitedLocations: route.visitedLocations.slice(0)
          };

          newRoute.distance = route.distance + this._distances.filter((distance) => {
            return (distance.location1 === route.currentLocation && distance.location2 === unvisitedLocations[i]) ||
                   (distance.location2 === route.currentLocation && distance.location1 === unvisitedLocations[i]);
          })[0].distance;

          newRoute.currentLocation = unvisitedLocations[i];
          newRoute.visitedLocations.push(unvisitedLocations[i]);

          this._routes.push(newRoute);
        }
      })
    }
  }
}

interface iDistance {
  location1: string,
  location2: string,
  distance: number
}

interface iRoute {
  startLocation: string,
  currentLocation: string,
  visitedLocations: string[],
  distance: number,
  current: boolean
}


