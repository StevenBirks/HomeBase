import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-2018-day8-5',
  templateUrl: './day8-5.component.html'
})
export class Day8_5_2018Component implements OnInit {
  public inputString: string;
  public answer: number;

  private _inputArray: number[];
  private _currentNode: iNode;
  private _nodes: iNode[];
  private _nodeRef: number;
  private _metaCount: number;

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

      while (this._currentNode !== undefined && this._currentNode.childNodesRemaining === 0) {
        this.processMeta(i);
        i += this._currentNode.metadataCount;
        this._currentNode = this._currentNode.parentNode;

        if (this._currentNode !== undefined) {
          this._currentNode.childNodesRemaining--;
        }
      }
    }

    console.log(this._nodes);

    this._metaCount = 0;

    this.countNodeMeta(this._nodes[0]);

    this.answer = this._metaCount;
  }

  private iterateNode(i: number): number {
    var steps = 0;
    var newNode = <iNode>{
      childNodeCount: this._inputArray[i],
      childNodesRemaining: this._inputArray[i],
      childNodes: new Array<iNode>(),
      metaData: new Array<number>(),
      metadataCount: this._inputArray[i + 1],
      parentNode: this._currentNode,
      ref: this._nodeRef
    };

    this._currentNode = newNode;
    this._nodes.push(newNode);

    if (newNode.parentNode !== undefined) {
      newNode.parentNode.childNodes.push(newNode);
    }

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

  private countNodeMeta(node: iNode) {
    if (node.childNodeCount === 0) {
      this.countLeafMeta(node);
    } else {
      node.metaData.forEach((meta) => {
        if (node.childNodes[meta-1] !== undefined) {
          this.countNodeMeta(node.childNodes[meta-1]);
        }
      });
    }
  }

  private countLeafMeta(node: iNode) {
    node.metaData.forEach((meta) => {
      this._metaCount += meta;
    })
  }
}

interface iNode {
  ref: number,
  parentNode: iNode,
  childNodeCount: number,
  childNodesRemaining: number,
  childNodes: iNode[],
  metadataCount: number,
  metaData: number[]
}