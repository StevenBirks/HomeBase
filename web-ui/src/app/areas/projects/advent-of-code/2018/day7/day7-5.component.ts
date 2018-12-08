import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-2018-day7-5',
  templateUrl: './day7-5.component.html'
})
export class Day7_5_2018Component implements OnInit {
  public inputString: string;
  public answer: number;

  private _steps: iStep[];
  private _stepOrder: string[];
  private _workers: iWorker[];
  //private _stepDefs: iStepDef[];
  private _timeTaken: number;

  constructor() { }

  ngOnInit() {
  };

  public calculate(): void {
    this._steps = new Array<iStep>();
    this._stepOrder = new Array<string>();
    this._workers = new Array<iWorker>();
    //this._stepDefs = new Array<iStepDef>();
    this._timeTaken = 0;

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

    // // initialise step defs
    // let timeRequired = 61;

    // for (let i = 65; i < 91; i++) {
    //   this._stepDefs.push(<iStepDef> {
    //     ref: String.fromCharCode(i),
    //     timeRequired: timeRequired
    //   })
    //   timeRequired++;
    // }

    // initialiase workers
    for (let i = 0; i < 5; i++) {
      this._workers.push(<iWorker>{
        timeRemaining: 0,
        workingOn: <iStep>{
          completed: false,
          ref: "",
          requires: ""
        }
      })
    }

    // sort steps into order
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
          return this._stepOrder.indexOf(step4.requires) > -1;
        });

        if (allUncompletedStepsForRef.length === foundStepsCompleted.length) {
          this.farmStep(uncompletedSteps[i]);
        } else {
          if (uncompletedSteps[i].requires === "") {
            this.farmStep(uncompletedSteps[i]);
          }
        }
      }

      this._timeTaken++;
      this.iterateTimeRemaining();
    }

    this.answer = this._timeTaken - 1;
  }

  private iterateTimeRemaining() {
    this._workers.forEach((worker) => {
      if (worker.timeRemaining === 1) {
        worker.workingOn.completed = true;
        console.log(`completed: ${worker.workingOn.ref}`);
        console.log(this._timeTaken);

        if (this._stepOrder.indexOf(worker.workingOn.ref) === -1) {
          this._stepOrder.push(worker.workingOn.ref);
          console.log(this._stepOrder);
        };

        worker.workingOn = <iStep>{
          completed: false,
          ref: "",
          requires: ""
        };
      }

      if (worker.timeRemaining > 0) {
        worker.timeRemaining--;
      }
    })
  }

  private farmStep(potentialStep: iStep) {
    console.log(`attempt to start ${potentialStep.ref}`)
    const availableWorkers = this._workers.filter((worker) => {
      return worker.timeRemaining === 0;
    });

    const workerWorkingOnStep = this._workers.filter((worker) => {
      return worker.workingOn.ref === potentialStep.ref;
    });

    const stepAlreadyCompleted = this._stepOrder.indexOf(potentialStep.ref) > -1;

    if (stepAlreadyCompleted) {
      potentialStep.completed = true;
      return;
    }

    if (workerWorkingOnStep.length === 0) {
      if (availableWorkers.length > 0) {
        console.log(`starting step ${potentialStep.ref}`);
        availableWorkers[0].workingOn = potentialStep;
        availableWorkers[0].timeRemaining = potentialStep.ref.charCodeAt(0) - 4;
      }
      else {
        console.log(`${potentialStep.ref}:no workers free to work on it`);
        console.log(this._workers);
      }
    }
    else {
      console.log(`${potentialStep.ref}: step already working on`);
      console.log(this._workers);
    }
  }
}

interface iStep {
  ref: string,
  requires: string,
  completed: boolean
}

interface iWorker {
  timeRemaining: number,
  workingOn: iStep
}

// interface iStepDef {
//   ref: string,
//   timeRequired: number
// }