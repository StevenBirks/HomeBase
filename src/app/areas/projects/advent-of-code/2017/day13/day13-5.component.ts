import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day13-5',
  templateUrl: './day13-5.component.html',
  styleUrls: ['./day13-5.component.scss']
})
export class Day13_5Component implements OnInit {

  constructor() { }
  public inputString: string;
  public answer: string;

  private _firewalls: iFirewall[];
  private _currentDepth: number;
  private _detected: boolean
  private _passed: boolean;
  private _iteration: number;
  private _delay: number;

  // for styles
  private _maxFirewallRange: number;
  
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
    
    const max = this._firewalls.reduce((prev, current) => {
       return (prev.range > current.range) ? prev : current
    })

    this._maxFirewallRange = max.range;

    this._passed = false;
    this._delay = 0;

    this._reset(); 
    
    this._run();
  } 

  private _moveScanners() : void {
    this._firewalls.forEach((firewall) => {
      if (firewall.scannerDirection === "down" && firewall.scannerPosition < firewall.range - 1) {
        firewall.scannerPosition++;
      } else if (firewall.scannerDirection === "up" && firewall.scannerPosition !== 0) {
        firewall.scannerPosition--;
      } else if (firewall.scannerDirection === "down" && firewall.scannerPosition === firewall.range - 1) {
        firewall.scannerPosition--;
        firewall.scannerDirection = "up";
      } else if (firewall.scannerDirection === "up" && firewall.scannerPosition === 0) {
        firewall.scannerPosition++;
        firewall.scannerDirection = "down";
      }
    });
  }

  private _reset(): void {
    this._currentDepth = 0;
    this._detected = false;

    this._firewalls.forEach((firewall) => {
      firewall.scannerDirection = "down";
      firewall.scannerPosition = 0;
    })
  }

  private _run(): void {
    for (let i = 0; i < this._delay; i++) {
      this._moveScanners();
    }

    while (this._currentDepth < this._firewalls[this._firewalls.length-1].depth && !this._detected) {
      let firewall = this._firewalls.filter(firewall => {
        return firewall.depth == this._currentDepth;
      });

      if (firewall.length === 1) {      
        if (firewall[0].scannerPosition === 0) {
          this._detected = true;
          console.log(`Delay: ${this._delay},  Detected depth: ${firewall[0].depth}`);
        }
      } 
      
      if (!this._detected) {
        this._moveScanners();
        this._currentDepth++;  
      }        
    }

    if (this._currentDepth === this._firewalls[this._firewalls.length-1].depth) {
      this._passed = true;
      this.answer = this._delay.toString();
    } else {
      setTimeout(() => {
        this.answer = this._delay.toString();
        this._delay +=2;
        this._reset(); 
        this._run();
      },2)
    }
  }
}

interface iFirewall {
  depth: number,
  range: number,
  scannerPosition: number,
  scannerDirection: string
}
