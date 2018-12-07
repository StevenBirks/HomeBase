import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2018-day7-5',
  templateUrl: './day7-5.component.html'
})
export class Day7_5_2018Component implements OnInit {
  public inputString: string;
  public answer: string;

  private _steps: iStep[];
  private _stepOrder: string[];

  constructor() { }

  ngOnInit() {
  };

  public calculate(): void {
    this._steps = new Array<iStep>();
    this._stepOrder = new Array<string>();

    this.inputString.split("\n").forEach((row) => {

      this._steps.push(<iStep>{
        ref: row.split(" ")[7],
        requires: row.split(" ")[1],
        completed: false
      });

    });

    this._steps.forEach((step) => {
      if (this._steps.filter((step1) => {
        return step.requires === step1.ref;
      }).length === 0) {
        this._steps.push(<iStep>{
          ref: step.requires,
          requires: "",
          completed: false
        })
      }
    });


    this._steps.sort((a, b) => {
      if (a.ref < b.ref) {
        return -1;
      } else if (a.ref > b.ref) {
        return 1;
      } else {
        if (a.requires < b.requires) {
          return -1;
        } else if (a.requires > b.requires) {
          return 1
        } else {
          return 0;
        }
      }
    })


    while (this._steps.filter((step1) => {
      return !step1.completed;
    }).length > 0) {
      const uncompletedSteps = this._steps.filter((step2) => {
        return !step2.completed;
      });

      for (let i = 0; i < uncompletedSteps.length; i++) {
        var allUncompletedStepsForRef = this._steps.filter((step3) => {
          return step3.ref == uncompletedSteps[i].ref && !step3.completed;
        });

        var foundStepsCompleted = allUncompletedStepsForRef.filter((step4) => {
          return  this._stepOrder.indexOf(step4.requires) > -1;
        });


        if (allUncompletedStepsForRef.length === foundStepsCompleted.length) {
          uncompletedSteps[i].completed = true;
          if (this._stepOrder.indexOf(uncompletedSteps[i].ref) === -1) {
            this._stepOrder.push(uncompletedSteps[i].ref);
          }
          break;
        } else {
          if (uncompletedSteps[i].requires === "") {
            uncompletedSteps[i].completed = true;
            this._stepOrder.push(uncompletedSteps[i].ref);
            break;
          }
        }
      }
    }

    this.answer = this._stepOrder.join("");
  }
}

interface iStep {
  ref: string,
  requires: string,
  completed: boolean
}