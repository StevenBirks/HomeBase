import { Component } from '@angular/core';

@Component({
  selector: 'app-2019-day14',
  templateUrl: './day14.component.html'
})
export class Day14_2019Component {
  constructor() { }

  public inputString: string;
  public answer: number;

  private _reactions: iReaction[];
  private _chemicalsRequiringCalc: iChemicalAndAmount[];
  private _createdbyOre: iChemicalAndAmount[];
  private _remainderCache: iChemicalAndAmount[];

  public calculate(): void {
    this.answer = 0;

    this.init();

    this.answer = this.beginFuelCalculate();
  }

  private beginFuelCalculate(): number {
    let fuelRequired = 0;

    this._chemicalsRequiringCalc = new Array<iChemicalAndAmount>();

    this._chemicalsRequiringCalc.push(<iChemicalAndAmount>{
      amount: 1,
      chemical: "FUEL"
    });

    while (this._chemicalsRequiringCalc.length > 0) {
      this.calculateChemicalsForChemical();
    }

    this._reactions.filter((reaction) => {
      return reaction.components[0].chemical === "ORE";
    }).forEach((reaction) => {
      let sum = 0;
      this._createdbyOre.filter((createdByOre) => {
        return createdByOre.chemical === reaction.chemical;
      }).forEach((one) => {
        sum += one.amount;
      })
      let oreReactions = Math.ceil(sum / reaction.output);

      fuelRequired += (oreReactions * reaction.components[0].amount);
    });

    // this._createdbyOre = new Array<iChemicalAndAmount>();
    // const newReq = JSON.stringify(this._remainderCache);
    // this._remainderCache = new Array<iChemicalAndAmount>();
    // this._chemicalsRequiringCalc = JSON.parse(newReq);

    // while (this._chemicalsRequiringCalc.length > 0) {
    //   this.calculateChemicalsForChemical();
    // }

    // this._reactions.filter((reaction) => {
    //   return reaction.components[0].chemical === "ORE";
    // }).forEach((reaction) => {
    //   let sum = 0;
    //   this._createdbyOre.filter((createdByOre) => {
    //     return createdByOre.chemical === reaction.chemical;
    //   }).forEach((one) => {
    //     sum += one.amount;
    //   })
    //   let oreReactions = Math.ceil(sum / reaction.output);

    //   fuelRequired -= (oreReactions * reaction.components[0].amount);
    // });

    return fuelRequired;
  }

  private calculateChemicalsForChemical() {
    let requiredReaction = this._reactions.find((reaction) => {
      return reaction.chemical === this._chemicalsRequiringCalc[0].chemical;
    });

    requiredReaction.components.forEach((component) => {
      if (component.chemical === "ORE") {
        const newThing = <iChemicalAndAmount>{
          amount: this._chemicalsRequiringCalc[0].amount,
          chemical: requiredReaction.chemical
        };

        this._createdbyOre.push(newThing);
      } else {
        //console.log(this._chemicalsRequiringCalc[0]);
        let amount = Math.ceil(this._chemicalsRequiringCalc[0].amount / requiredReaction.output);

        let required = component.amount * amount;
        let cacheIndex = this._remainderCache.findIndex((remainder) => {
          return remainder.chemical === component.chemical;
        });

        if (cacheIndex !== -1) {
          let diff = required - this._remainderCache[cacheIndex].amount;

          if (diff > 0) {
            required -= this._remainderCache[cacheIndex].amount;
            this._remainderCache.splice(cacheIndex, 1);
          } else if (diff === 0) {
            required = 0;
            this._remainderCache.splice(cacheIndex, 1);
          } else if (diff < 0) {
            this._remainderCache[cacheIndex].amount -= required;
            required = 0;
          }

          console.log("use");
          this._remainderCache.forEach((o) => {
            console.log(o);
          });
        }

        const newThing2 = <iChemicalAndAmount>{
          amount: required,
          chemical: component.chemical
        };

        const remainder = (requiredReaction.output * amount) - this._chemicalsRequiringCalc[0].amount;

        if (remainder > 0) {
          const existsInCacheIndex = this._remainderCache.findIndex((remainder) => {
            return remainder.chemical === this._chemicalsRequiringCalc[0].chemical;
          });

          if (existsInCacheIndex !== -1) {
            this._remainderCache[existsInCacheIndex].amount += remainder;
          } else {
            this._remainderCache.push(<iChemicalAndAmount>{
              amount: remainder,
              chemical: this._chemicalsRequiringCalc[0].chemical
            });
          }
          console.log("store");
          this._remainderCache.forEach((o) => {
            console.log(o);
          });
        }

        if (required > 0) {
          this._chemicalsRequiringCalc.push(newThing2);
        }
      }
    })

    this._chemicalsRequiringCalc.shift();
  }

  private init() {
    this._reactions = new Array<iReaction>();
    this._createdbyOre = new Array<iChemicalAndAmount>();
    this._remainderCache = new Array<iChemicalAndAmount>();

    this.inputString.split("\n").forEach((reaction) => {
      let newCAndAs = new Array<iChemicalAndAmount>();
      reaction.split("=> ")[0].split(", ").forEach((cAndA) => {
        newCAndAs.push(<iChemicalAndAmount>{
          amount: Number.parseInt(cAndA.split(" ")[0]),
          chemical: cAndA.split(" ")[1]
        });
      });

      const newReaction = <iReaction>{
        chemical: reaction.split("=> ")[1].split(" ")[1],
        components: newCAndAs,
        output: Number.parseInt(reaction.split("=> ")[1].split(" ")[0])
      };

      this._reactions.push(newReaction);
    })
  }
}

interface iReaction {
  components: iChemicalAndAmount[],
  chemical: string,
  output: number
}

interface iChemicalAndAmount {
  chemical: string,
  amount: number
}