import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day24-5',
  templateUrl: './day24-5.component.html'
})
export class Day24_5Component implements OnInit {

  constructor() { 
    this.inputString = `50/41
    19/43
    17/50
    32/32
    22/44
    9/39
    49/49
    50/39
    49/10
    37/28
    33/44
    14/14
    14/40
    8/40
    10/25
    38/26
    23/6
    4/16
    49/25
    6/39
    0/50
    19/36
    37/37
    42/26
    17/0
    24/4
    0/36
    6/9
    41/3
    13/3
    49/21
    19/34
    16/46
    22/33
    11/6
    22/26
    16/40
    27/21
    31/46
    13/2
    24/7
    37/45
    49/2
    32/11
    3/10
    32/49
    36/21
    47/47
    43/43
    27/19
    14/22
    13/43
    29/0
    33/36
    2/6`;
  }
  public inputString: string;
  public answer: number;
  public totalBridges: number;
  public bridgesCompleted: number;
  public bridgesRemaining: number;

  private _components: iComponent[];
  private _bridges: iBridge[];
  private _longestBridge: iBridge;
  
  ngOnInit() {
  }

  public calculate(): void {
    var rowsString = this.inputString.split("\n");
    let checkSum = 0;
    this._components = new Array<iComponent>();
    this._bridges = new Array<iBridge>();
    this.totalBridges = 0;
    this.bridgesCompleted = 0;
    this.bridgesRemaining = 0;
    this.answer = 0;

    rowsString.forEach((row) => {
      let newComponent = <iComponent> {
        port1Type: Number.parseInt(row.split("/")[0]),
        port2Type: Number.parseInt(row.split("/")[1])
      };

      this._components.push(newComponent);
    });

    let startPort = 0;

    let matchingBaseComponents = this._components.filter((component) => {
      return (component.port1Type === startPort ||
              component.port2Type === startPort)
    });

    matchingBaseComponents.forEach((component) => {
      let newBridge = <iBridge> {
        components: [component],
        openPortType: component.port1Type === 0 ? component.port2Type : component.port1Type,
        strength: component.port1Type + component.port2Type,
        completed: false
      }
      this._longestBridge = newBridge;

      this._bridges.push(newBridge);
      this.totalBridges++;
    });

    this._calculateBridges();
  }

  private _calculateBridges(): void {
    let currentBridge = this._bridges[0];

    let newValidComponents = this._findNewValidComponentsForBridge(currentBridge);

    if (newValidComponents.length > 0) {
      newValidComponents.forEach((component) => {
        let newComponentsArray = Object.assign([], currentBridge.components);
        newComponentsArray.push(component);
        let newBridge = <iBridge> {
          components: newComponentsArray,
          openPortType: component.port1Type === currentBridge.openPortType ? component.port2Type : component.port1Type,
          strength: currentBridge.strength + component.port1Type + component.port2Type,
          completed: false
        };

        this._bridges.push(newBridge);
        this._updateBridgeStrength(newBridge);
        this.totalBridges++;
      });

      this._bridges.shift();
      this.totalBridges--;

    } else {
      this._bridges.shift();
      this.bridgesCompleted++;
    }

    this.bridgesRemaining = this.totalBridges - this.bridgesCompleted;
    
    if (this.bridgesRemaining > 0) {
      setTimeout(() => {
        this._calculateBridges();
      }, 1);
    }
  }

  private _findNewValidComponentsForBridge(bridge: iBridge): iComponent[] {
    let newComponents = new Array<iComponent>();

    this._components.filter((component) => {
      return (component.port1Type === bridge.openPortType ||
              component.port2Type === bridge.openPortType) &&
              bridge.components.find((currentComponent) => {
                return currentComponent.port2Type === component.port2Type &&
                       currentComponent.port1Type === component.port1Type;
              }) === undefined;
    }).forEach((result) => {
      let newComponent = <iComponent> {
        port1Type: result.port1Type,
        port2Type: result.port2Type
      };

      newComponents.push(newComponent);
    })

    return newComponents;
  }

  private _updateBridgeStrength(bridge: iBridge): void {
    if (bridge.components.length > this._longestBridge.components.length) {
      this._longestBridge = bridge;
      this.answer = bridge.strength;
      console.log(this._longestBridge);
    } else if (bridge.components.length === this._longestBridge.components.length) {
      if (bridge.strength > this._longestBridge.strength) {
        this._longestBridge = bridge;
        this.answer = bridge.strength;
        console.log(this._longestBridge);
      }    
    }
  }
}

interface iComponent {
  port1Type: number,
  port2Type: number
}

interface iBridge {
  components: iComponent[],
  openPortType: number,
  strength: number,
  completed: boolean
}
