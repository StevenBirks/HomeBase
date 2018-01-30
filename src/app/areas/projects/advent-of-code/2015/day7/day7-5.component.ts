import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-2015-day7-5',
  templateUrl: './day7-5.component.html'
})

export class Day7_5_2015Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: number;

  private _wires: iWire[];
  private _operations: iOperation[];


  ngOnInit() {
  }

  public calculate(): void {
    var inputRows = this.inputString.split("\n");
    this.answer = 0;

    this._operations = new Array<iOperation>();
    this._wires = new Array<iWire>();

    for (const row of inputRows) {
      let operator = this._getOperation(row);
      this._operations.push(operator);

      if (this._wires.filter((wire) => {
        return wire.name === operator.input1
      }).length === 0 &&
        operator.input1 !== undefined &&
        isNaN(Number.parseInt(operator.input1))) {
        this._wires.push(<iWire>{ name: operator.input1, outputValue: undefined });
      }

      if (this._wires.filter((wire) => {
        return wire.name === operator.input2;
      }).length === 0 && operator.input2 !== undefined) {
        this._wires.push(<iWire>{ name: operator.input2, outputValue: undefined });
      }

      if (this._wires.filter((wire) => {
        return wire.name === operator.output;
      }).length === 0 && operator.output !== undefined) {
        this._wires.push(<iWire>{ name: operator.output, outputValue: undefined });
      }
    }

    this._run();

    let a = this._wires.find((wire) => {
      return wire.name === "a";
    }).outputValue;

    this._operations.forEach((operation) => {
      operation.completed = false;
    });

    this._wires.forEach((wire) => {
      wire.outputValue = undefined;
    })

    debugger;

    this._operations.find((operation) => {
      return operation.operator === Operator.VALUE &&
        operation.output === "b";
    }).input1 = a.toString();

    this._run();

    this.answer = this._wires.find((wire) => {
      return wire.name === "a";
    }).outputValue;
  }

  private _run() {
    let previousCompletedOperations = 1;

    while (previousCompletedOperations > 0) {
      previousCompletedOperations = 0;

      this._operations.filter((operation) => {
        return !operation.completed;
      }).forEach((operation) => {
        if (operation.operator === Operator.RSHIFT) {
          if (this._wires.find((wire) => {
            return wire.name === operation.input1;
          }).outputValue !== undefined) {
            let newVal = this._wires.find((wire) => {
              return wire.name === operation.input1;
            }).outputValue >> operation.shift;

            //console.log(operation);
            //console.log("oldval: ", this._wires.find((wire) => {
            //  return wire.name === operation.input1;
            //}).outputValue)
            //console.log("newVal: ", newVal);

            this._wires.find((wire) => {
              return wire.name === operation.output;
            }).outputValue = newVal;

            previousCompletedOperations++;
            operation.completed = true;
          }
        } else if (operation.operator === Operator.LSHIFT) {
          if (this._wires.find((wire) => {
            return wire.name === operation.input1;
          }).outputValue !== undefined) {
            let newVal = this._wires.find((wire) => {
              return wire.name === operation.input1;
            }).outputValue << operation.shift;

            let num = newVal.toString(2).split("");

            while (num.length > 16) {
              num.shift();
            }

            //console.log(operation);
            //console.log("newVal: ", newVal);
            //console.log("num: ", Number.parseInt(num.join(""), 2));

            this._wires.find((wire) => {
              return wire.name === operation.output;
            }).outputValue = Number.parseInt(num.join(""), 2);

            previousCompletedOperations++;
            operation.completed = true;
          }
        } else if (operation.operator === Operator.OR) {
          if (this._wires.find((wire) => {
            return wire.name === operation.input1;
          }).outputValue !== undefined &&
            this._wires.find((wire) => {
              return wire.name === operation.input2;
            }).outputValue !== undefined) {
            let newVal = this._wires.find((wire) => {
              return wire.name === operation.input1;
            }).outputValue | this._wires.find((wire) => {
              return wire.name === operation.input2;
            }).outputValue;

            //console.log(operation);
            //console.log(newVal);

            this._wires.find((wire) => {
              return wire.name === operation.output;
            }).outputValue = newVal;

            previousCompletedOperations++;
            operation.completed = true;
          }
        } else if (operation.operator === Operator.AND) {
          if (isNaN(Number.parseInt(operation.input1))) {
            if (this._wires.find((wire) => {
              return wire.name === operation.input1;
            }).outputValue !== undefined &&
              this._wires.find((wire) => {
                return wire.name === operation.input2;
              }).outputValue !== undefined) {
              let newVal = this._wires.find((wire) => {
                return wire.name === operation.input1;
              }).outputValue & this._wires.find((wire) => {
                return wire.name === operation.input2;
              }).outputValue;

              //console.log(operation);
              //console.log(newVal);

              this._wires.find((wire) => {
                return wire.name === operation.output;
              }).outputValue = newVal;

              previousCompletedOperations++;
              operation.completed = true;
            }
          } else {
            if (this._wires.find((wire) => {
              return wire.name === operation.input2;
            }).outputValue !== undefined) {
              let newVal = Number.parseInt(operation.input1) & this._wires.find((wire) => {
                return wire.name === operation.input2;
              }).outputValue;

              //console.log(operation);
              //console.log(newVal);

              this._wires.find((wire) => {
                return wire.name === operation.output;
              }).outputValue = newVal;

              previousCompletedOperations++;
              operation.completed = true;
            }
          }
        } else if (operation.operator === Operator.NOT) {
          if (this._wires.find((wire) => {
            return wire.name === operation.input1;
          }).outputValue !== undefined) {
            let num = this._wires.find((wire) => {
              return wire.name === operation.input1;
            }).outputValue.toString(2).split("");

            while (num.length < 16) {
              num.unshift("0");
            }

            for (let i = 0; i < 16; i++) {
              if (num[i] === "0") {
                num[i] = "1";
              } else {
                num[i] = "0";
              }
            }

            this._wires.find((wire) => {
              return wire.name === operation.output;
            }).outputValue = Number.parseInt(num.join(""), 2);

            //console.log(operation);
            //console.log(Number.parseInt(num.join(""), 2));

            previousCompletedOperations++;
            operation.completed = true;
          }
        } else if (operation.operator === Operator.DIRECT) {
          if (this._wires.find((wire) => {
            return wire.name === operation.input1;
          }).outputValue !== undefined) {
            let newVal = this._wires.find((wire) => {
              return wire.name === operation.input1;
            }).outputValue;

            //console.log(operation);
            //console.log(newVal);

            this._wires.find((wire) => {
              return wire.name === operation.output;
            }).outputValue = newVal;

            previousCompletedOperations++;
            operation.completed = true;
          }
        } else if (operation.operator === Operator.VALUE) {
          let newVal = Number.parseInt(operation.input1);

          //console.log(operation);
          //console.log(newVal);

          this._wires.find((wire) => {
            return wire.name === operation.output;
          }).outputValue = newVal;

          previousCompletedOperations++;
          operation.completed = true;
        }
      })

      //console.log("completed ops: ", previousCompletedOperations);
      //console.log("a: ", this._wires.find((wire) => {
      //  return wire.name === "a";
      //}).outputValue);
    }
  }

  private _getOperation(row: string): iOperation {
    let rowArray = row.split(" ");
    let newOperation = <iOperation>{ completed: false };

    if (row.indexOf("RSHIFT") !== -1) {
      newOperation.operator = Operator.RSHIFT;
      newOperation.input1 = rowArray[0];
      newOperation.output = rowArray[4];
      newOperation.shift = Number.parseInt(rowArray[2]);
    } else if (row.indexOf("LSHIFT") !== -1) {
      newOperation.operator = Operator.LSHIFT;
      newOperation.input1 = rowArray[0];
      newOperation.output = rowArray[4];
      newOperation.shift = Number.parseInt(rowArray[2]);
    } else if (row.indexOf("AND") !== -1) {
      newOperation.operator = Operator.AND;
      newOperation.input1 = rowArray[0];
      newOperation.input2 = rowArray[2];
      newOperation.output = rowArray[4];
    } else if (row.indexOf("OR") !== -1) {
      newOperation.operator = Operator.OR;
      newOperation.input1 = rowArray[0];
      newOperation.input2 = rowArray[2];
      newOperation.output = rowArray[4];
    } else if (row.indexOf("NOT") !== -1) {
      newOperation.operator = Operator.NOT;
      newOperation.input1 = rowArray[1];
      newOperation.output = rowArray[3];
    } else {
      if (isNaN(Number.parseInt(rowArray[0]))) {
        newOperation.operator = Operator.DIRECT;
        newOperation.input1 = rowArray[0];
        newOperation.output = rowArray[2];
      } else {
        newOperation.operator = Operator.VALUE;
        newOperation.input1 = rowArray[0];
        newOperation.output = rowArray[2];
      }
    }

    return newOperation;
  }
}

interface iOperation {
  operator: Operator,
  shift: number,
  input1: string,
  input2: string,
  output: string,
  completed: boolean
}

interface iWire {
  name: string,
  outputValue: number
}

enum Operator {
  RSHIFT,
  LSHIFT,
  OR,
  AND,
  NOT,
  DIRECT,
  VALUE
}
