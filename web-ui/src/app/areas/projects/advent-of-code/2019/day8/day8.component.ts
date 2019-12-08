import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2019-day8',
  templateUrl: './day8.component.html'
})
export class Day8_2019Component implements OnInit {
  constructor() { }


  public inputString: string;
  public answer: number;

  _answer: number;

  private _image: iImage;
  private _stackedImage: number[][];

  ngOnInit() {
  }

  public calculate(): void {
    const newLayers = new Array<iLayer>();
    this._image = { layers: newLayers } as iImage;

    this.separateLayers();

    const lowZeroIndex = this.calculateLowestZeroCountLayerIndex();

    this.answer = this._answer = this.calculateOnesTimesTwos(lowZeroIndex);

    this.stackLayers();
  }

  private stackLayers() {
    let newLayer = new Array<Array<number>>();

    for (let i = 0; i < 6; i++) {
      let newRow = new Array<number>();

      for (let j = 0; j < 25; j++) {
        let stack = new Array<number>();

        for (let k = 0; k < this._image.layers.length; k++) {
          stack.push(this._image.layers[k].layer[i][j]);
        }
        
        newRow.push(stack.find((val) => {
          return val === 0 || val === 1;
        }))
      }

      newLayer.push(newRow);
    }

    this._stackedImage = newLayer;

    console.log(this._stackedImage);
  }

  private calculateLowestZeroCountLayerIndex(): number {
    let lowestZeroCount = 9999999;
    let lowestZeroIndex = 0;

    for (let k = 0; k < this._image.layers.length; k++) {
      let zeroCount = 0;
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 25; j++) {
          if (this._image.layers[k].layer[i][j] === 0) {
            zeroCount++;
          }
        }
      }

      if (zeroCount < lowestZeroCount) {
        lowestZeroCount = zeroCount
        lowestZeroIndex = k;
      }
    }

    return lowestZeroIndex;
  }

  private calculateOnesTimesTwos(index: number): number {
    let onesCount = 0;
    let twosCount = 0;

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 25; j++) {
        if (this._image.layers[index].layer[i][j] === 1) {
          onesCount++;
        } else if (this._image.layers[index].layer[i][j] === 2) {
          twosCount++;
        }
      }
    }

    return onesCount * twosCount;
  }

  private separateLayers() {
    let inputArray = this.inputString.split("");

    while (inputArray.length > 0) {
      let newLayer = { layer: new Array<Array<number>>() } as iLayer;

      for (let i = 0; i < 6; i++) {
        let newRow = inputArray.splice(0, 25);
        let newRowInts = new Array<number>();

        newRow.forEach((val) => {
          newRowInts.push(Number.parseInt(val));
        });

        newLayer.layer.push(newRowInts);
      }

      this._image.layers.push(newLayer);
    }

    console.log(this._image);
  }
}

interface iImage {
  layers: iLayer[]
}

interface iLayer {
  layer: number[][]
}
