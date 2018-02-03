import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day13',
  templateUrl: './day13.component.html'
})
export class Day13Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: number;

  private _firewalls: iFirewall[];
  private _currentDepth: number;
  private _severity: number;
  
  ngOnInit() {
  }

  public calculate(): void {
    const rowsString = this.inputString.split("\n");
    this._firewalls = new Array<iFirewall>();


    for (const row of rowsString) {
      const rowItemsArray = row.split(": ");

      const newFirewall = <iFirewall> {
        depth: Number.parseInt(rowItemsArray[0]),
        range: Number.parseInt(rowItemsArray[1]),
        scannerPosition: 0,
        scannerDirection: "down"
      };

      this._firewalls.push(newFirewall);
    }

    this._currentDepth = 0;
    this._severity = 0;

    while (this._currentDepth < this._firewalls[this._firewalls.length-1].depth) {
      let firewall = this._firewalls.filter(firewall => {
        return firewall.depth == this._currentDepth;
      });

      if (firewall.length === 1) {
      
        if (firewall[0].scannerPosition === 0) {
          this._severity += (firewall[0].depth *firewall[0].range);
        }
      }
      
      this._moveScanners();
      this._currentDepth++;    
      
    }

    this.answer = this._severity;
  } 

  private _moveScanners() : void {
    this._firewalls.forEach((firewall) => {
      if (firewall.scannerDirection === "down" && firewall.scannerPosition < firewall.range - 1) {
        // if going down and can go down
        firewall.scannerPosition++;
      } else if (firewall.scannerDirection === "up" && firewall.scannerPosition !== 0) {
        // if going up and can go up
        firewall.scannerPosition--;
      } else if (firewall.scannerDirection === "down" && firewall.scannerPosition === firewall.range - 1) {
        // at reached bottom
        firewall.scannerPosition--;
        firewall.scannerDirection = "up";
      } else if (firewall.scannerDirection === "up" && firewall.scannerPosition === 0) {
        // at reached top
        firewall.scannerPosition++;
        firewall.scannerDirection = "down";
      } else {
        debugger;
        console.log("oh No! Scanner broke");
      }
    });
  }
}

interface iFirewall {
  depth: number,
  range: number,
  scannerPosition: number,
  scannerDirection: string
}
