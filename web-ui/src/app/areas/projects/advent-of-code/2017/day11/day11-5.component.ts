import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day11-5',
  templateUrl: './day11-5.component.html'
})
export class Day11_5Component implements OnInit {

  constructor() { }
  
    public inputString: string;
    public answer: number;
  
    private inputArray: string[];
    private _maxDistance: number;
    
    ngOnInit() {
    }
  
    public calculate(): void {
      this.inputArray = new Array<string>();
      this._maxDistance = 0;

      this.inputString.split(",").forEach(direction => {
        this.inputArray.push(direction);
      });   

      let x = 0;
      let y = 0;

      
      this.inputArray.forEach(direction => {
        if (direction === "n") {
          y += 2;
        } else if (direction === "s") {
          y -= 2;          
        } else if (direction === "nw") {
          y++;
          x--;
        } else if (direction === "ne") {
          y++;
          x++;
        } else if (direction === "se") {
          y--;
          x++;   
        } else if (direction === "sw") {
          y--;
          x--;            
        }

        this._calculateDistance(x, y);
      });

      this.answer = this._maxDistance;
    }

    private _calculateDistance(x: number, y: number) {
      x = Math.abs(x);
      y = Math.abs(y);
      
      let stepCount = 0;

      while (x > 0) {
        x--;
        y--;
        stepCount++
      }

      while (y > 0) {
        y -= 2;
        stepCount++;
      }

      if (stepCount > this._maxDistance) {
        this._maxDistance = stepCount;
      }      
    }
  }
  