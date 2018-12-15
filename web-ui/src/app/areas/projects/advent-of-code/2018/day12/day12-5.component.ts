import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-2018-day12-5',
  templateUrl: './day12-5.component.html'
})
export class Day12_5_2018Component implements OnInit {

  constructor() { }

  public answer: number;
  public inputString: string;
  private _pots: string[];
  private _rules: iRule[];
  private _plantCount: number
  private _slicedCount: number
  private _prevCount: number
  private _genDiff: number
  private _prevGenDiff: number;

  ngOnInit() {
  }

  public calculate(): void {
    this.init()

    for (let i = 0; i < 1000; i++) {
      this.countPots();
      this.iterateGeneration();
    }

    this.countPots();
    this.answer = this._plantCount + 
    ((this._plantCount - this._prevCount) * (50000000000 - 1000));
  }

  private findRule(potArray: string): iRule {
    return this._rules.find((rule) => {
      return rule.id === potArray;
    });
  }

  private iterateGeneration() {
    const potsTemp = this._pots.slice();

    // 1
    let potArray = `.${potsTemp[0]}${potsTemp[1]}${potsTemp[2]}${potsTemp[3]}`;
    let validRule = this.findRule(potArray);
    this._pots[1] = validRule.result;

    // 0
    potArray = `..${potsTemp[0]}${potsTemp[1]}${potsTemp[2]}`;
    validRule = this.findRule(potArray);
    this._pots[0] = validRule.result;

    for (let i = 2; i < potsTemp.length - 2; i++) {
      const potArray = `${potsTemp[i - 2]}${potsTemp[i - 1]}${potsTemp[i]}${potsTemp[i + 1]}${potsTemp[i + 2]}`;
      let validRule = this.findRule(potArray);
      this._pots[i] = validRule.result;
    }

    // end -1
    potArray = `${potsTemp[potsTemp.length - 4]}${potsTemp[potsTemp.length - 3]}${potsTemp[potsTemp.length - 2]}${potsTemp[potsTemp.length - 1]}.`;
    validRule = this.findRule(potArray);
    this._pots[this._pots.length - 2] = validRule.result;

    // end
    potArray = `${potsTemp[potsTemp.length - 3]}${potsTemp[potsTemp.length - 2]}${potsTemp[potsTemp.length - 1]}..`;
    validRule = this.findRule(potArray);

    this._pots[this._pots.length - 1] = validRule.result;

    // end +1
    potArray = `${potsTemp[potsTemp.length - 2]}${potsTemp[potsTemp.length - 1]}...`;
    validRule = this.findRule(potArray);

    let prepushed = false
    if (validRule.result === '#') {
      this._pots.push(validRule.result);
      prepushed = true;
    }

    // end +2
    potArray = `${potsTemp[potsTemp.length - 1]}....`;
    validRule = this.findRule(potArray);

    if (validRule.result === '#') {
      if (!prepushed) {
        this._pots.push('.');
      }
      this._pots.push(validRule.result);
    }

    // -1
    potArray = `...${potsTemp[0]}${potsTemp[1]}`;
    validRule = this.findRule(potArray);

    var prevsliced = false;

    if (validRule.result === '#') {
      this._pots.unshift(validRule.result);
      this._slicedCount++;
      prevsliced = true;
    }

    // -2
    potArray = `....${potsTemp[0]}`;
    validRule = this.findRule(potArray);

    if (validRule.result === '#') {
      if (prevsliced === false) {
        this._pots.unshift(".");
        this._slicedCount++;
      }
      this._pots.unshift(validRule.result);
      this._slicedCount++;
    }
  }

  private countPots() {
    this._prevGenDiff = this._genDiff;
    this._genDiff = this._plantCount - this._prevCount;
    this._prevCount = this._plantCount;
    this._plantCount = 0;
    for (let i = 0; i < this._pots.length; i++) {
      if (this._pots[i] === '#') {
        this._plantCount += (i - this._slicedCount);
      }
    }
  }

  private init() {
    this._slicedCount = 0;
    this._plantCount = 0;
    this._prevCount = 0;
    this._genDiff = 0;
    this._prevGenDiff = 0;
    this._pots = new Array<string>();

    this.inputString.split('\n')[0].split(" ")[2].split("").forEach((pot) => {
      this._pots.push(pot);
    });

    let inputRules = this.inputString.split("\n");

    this._rules = new Array<iRule>();

    for (let i = 2; i < inputRules.length; i++) {
      const newRule = <iRule>{
        id: `${inputRules[i].split("")[0]}${inputRules[i].split("")[1]}${inputRules[i].split("")[2]}${inputRules[i].split("")[3]}${inputRules[i].split("")[4]}`,
        result: inputRules[i].split("")[9]
      }

      this._rules.push(newRule);
    }
  }
}

interface iRule {
  id: string,
  result: string
}
