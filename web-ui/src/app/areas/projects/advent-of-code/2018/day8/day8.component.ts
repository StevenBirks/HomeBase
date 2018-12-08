import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day8',
  templateUrl: './day8.component.html'
})
export class Day8_2018Component implements OnInit {
  public inputString: string;
  public answer: number;

  private _inputArray: number[];
  private _currentNode: iNode;
  private _nodes: iNode[];
  private _nodeRef: number;


  constructor() { }

  ngOnInit() {
  };

  public calculate(): void {
    this._inputArray = new Array<number>();
    this._nodes = new Array<iNode>();
    this._nodeRef = 0;

    this.inputString.split(" ").forEach((value) => {
      this._inputArray.push(Number.parseInt(value, 10));
    });

    for (let i = 0; i < this._inputArray.length; i++) {
        const step = this.iterateNode(i);
        i += step + 1;

        while(this._currentNode !== undefined && this._currentNode.childNodesRemaining === 0) {
          this.processMeta(i);
          i += this._currentNode.metadataCount;
          this._currentNode = this._currentNode.parentNode;

          if (this._currentNode !== undefined) {
          this._currentNode.childNodesRemaining--;
          }
        }
    }
    
    this.answer = this.countMeta();
  }

  private iterateNode(i: number): number {
    var steps = 0;
    var newNode = <iNode>{
      childNodeCount: this._inputArray[i],
      childNodesRemaining: this._inputArray[i],
      metaData: new Array<number>(),
      metadataCount: this._inputArray[i + 1],
      parentNode: this._currentNode,
      ref: this._nodeRef
    };

    this._currentNode = newNode;
    this._nodes.push(newNode);

    if (newNode.childNodeCount === 0) {
      this.consumeLeafNode(newNode, i);
      steps = newNode.metadataCount;

      this._currentNode = newNode.parentNode;
      this._currentNode.childNodesRemaining--;

    }

    this._nodeRef++;

    return steps;
  }

  private consumeLeafNode(newNode: iNode, i: number) {
    for (let j = 0; j < newNode.metadataCount; j++) {
      newNode.metaData.push(this._inputArray[i + j + 2]);
    }
  }

  private processMeta(i: number) {
    for (let j = 0; j < this._currentNode.metadataCount; j++) {
      this._currentNode.metaData.push(this._inputArray[i + j + 1]);
    }
  }

  private countMeta(): number {
    let metaCount = 0;

    for (let i = 0; i < this._nodes.length; i++) {
      for (let j = 0; j < this._nodes[i].metaData.length; j++) {
        metaCount += this._nodes[i].metaData[j];
      }
    }

    return metaCount;
  }
}

interface iNode {
  ref: number,
  parentNode: iNode,
  childNodeCount: number,
  childNodesRemaining: number,
  metadataCount: number,
  metaData: number[]
}