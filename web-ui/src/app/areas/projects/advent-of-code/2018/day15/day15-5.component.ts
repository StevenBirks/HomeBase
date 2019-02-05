import { Component, OnInit, ViewChild } from '@angular/core';
import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { GameDisplayComponent } from './game-display/game-display.component';

@Component({
  selector: 'app-2018-day15-5',
  templateUrl: './day15-5.component.html'
})
export class Day15_5_2018Component implements OnInit {
  _elfAttack: number;


  constructor(public dialog: MatDialog) { }

  @ViewChild(GameDisplayComponent) child: GameDisplayComponent;

  public inputString: string;

  public _cave: string[][];
  public _combatants: iCombatant[];
  private _roundCount: number;
  public _paused: boolean;
  public _elfDeath: boolean;

  ngOnInit() {
    this._elfAttack = 4;
    this._paused = true;
  }

  public calculate(): void {
    this.init();
    this.openDialog();
  }

  private iterate() {
    if (this.isVictory()) {
      if (this.goblinCount() === 0) {
        this.child.victory(this._roundCount, "Elves");
      } else if (this.elfCount() === 0) {
        this.child.victory(this._roundCount, "Goblins");
      }
      return;
    }

    let victoryMet = false;

    this.sortCombatants();

    this._combatants.forEach((combatant) => {
      if (this.isVictory()) {
        victoryMet = true;
      } else if (combatant.health > 0) {
        const inRange = this.isInRange(combatant);
        if (!inRange) {
          const enemyLocations = this.findEnemyLocations(combatant);
          if (enemyLocations.length > 0) {
            this.moveCombatant(combatant, enemyLocations);
          }
        }

        this.attack(combatant);
      }
    });

    this.child.updateValues(this._cave, this._combatants, this._elfAttack);

    if (this._elfDeath) {
      this.init()
      this._elfAttack++;
      this.iterate();
    } else {
    if (victoryMet) {
      if (this.goblinCount() === 0) {
        this.child.victory(this._roundCount, "Elves");
      } else if (this.elfCount() === 0) {
        this.child.victory(this._roundCount, "Goblins");
      }
    } else {
      this._roundCount++;
      if (!this._paused) {
        window.setTimeout(() => {
          this.iterate();
        }, 100);
      }
    }
  }
  }

  private isVictory(): boolean {
    return this.elfCount() === 0 || this.goblinCount() === 0;
  }

  private elfCount(): number {
    return this._combatants.filter((comb) => {
      return comb.type === type.elf && comb.health > 0;
    }).length;
  }

  private goblinCount(): number {
    return this._combatants.filter((comb) => {
      return comb.type === type.goblin && comb.health > 0;
    }).length;
  }

  private attack(combatant: iCombatant) {
    const mostAppropriate = this.findMostAppropriateEnemy(combatant);

    if (mostAppropriate !== null) {
      if (combatant.type === type.elf) {
        mostAppropriate.health -= this._elfAttack;
      } else{
        mostAppropriate.health -= 3;
      }

      if (mostAppropriate.health <= 0) {
        if (mostAppropriate.type === type.elf) {
          this._elfDeath = true;
        }

        this._cave[mostAppropriate.y][mostAppropriate.x] = ".";
      }
    }
  }

  private findMostAppropriateEnemy(combatant: iCombatant): iCombatant {
    const enemy = combatant.type === type.elf ? "G" : "E";

    let mostApproptiate = null;

    if (this._cave[combatant.y - 1][combatant.x] === enemy) {
      mostApproptiate = this._combatants.find((comb) => {
        return comb.x === combatant.x && comb.y === combatant.y - 1 && comb.health > 0;
      });
    }
    if (this._cave[combatant.y][combatant.x - 1] === enemy) {
      const potential = this._combatants.find((comb) => {
        return comb.x === combatant.x - 1 && comb.y === combatant.y && comb.health > 0;
      });

      if (potential !== null) {
        if (mostApproptiate === null) {
          mostApproptiate = potential;
        } else if (potential.health < mostApproptiate.health) {
          mostApproptiate = potential;
        }
      }
    }
    if (this._cave[combatant.y][combatant.x + 1] === enemy) {
      const potential = this._combatants.find((comb) => {
        return comb.x === combatant.x + 1 && comb.y === combatant.y && comb.health > 0;
      });

      if (potential !== null) {
        if (mostApproptiate === null) {
          mostApproptiate = potential;
        } else if (potential.health < mostApproptiate.health) {
          mostApproptiate = potential;
        }
      }
    }
    if (this._cave[combatant.y + 1][combatant.x] === enemy) {
      const potential = this._combatants.find((comb) => {
        return comb.x === combatant.x && comb.y === combatant.y + 1 && comb.health > 0;
      });

      if (potential !== null) {
        if (mostApproptiate === null) {
          mostApproptiate = potential;
        } else if (potential.health < mostApproptiate.health) {
          mostApproptiate = potential;
        }
      }
    }

    return mostApproptiate;
  }

  private moveCombatant(combatant: iCombatant, enemyLocations: iLocation[]) {
    let paths = this.generatePaths(combatant, enemyLocations);

    paths = paths.filter((path) => {
      return path.encounterEnemy;
    })

    let minX = 1000000;
    let minY = 1000000;

    let mostAppropriate = paths.slice(0);

    mostAppropriate = this.findMostAppropriatePath(mostAppropriate);

    if (mostAppropriate.length >= 1) {
      this._cave[combatant.y][combatant.x] = ".";

      combatant.x = mostAppropriate[0].steps[1].x;
      combatant.y = mostAppropriate[0].steps[1].y;

      this._cave[combatant.y][combatant.x] = combatant.type === type.elf ? "E" : "G";
    }
  }

  private findMostAppropriatePath(paths: iPath[]): iPath[] {
    let appropriatePaths = new Array<iPath>();

    let minX = 1000000;
    let minY = 1000000;

    const index = paths.length > 0 ? paths[0].steps.length - 1 : null;

    paths.forEach((path) => {
      if (path.steps[index].y < minY) {
        minY = path.steps[index].y;
        minX = path.steps[index].x;
      } else if (path.steps[index].y === minY) {
        if (path.steps[index].x < minX) {
          minX = path.steps[index].x;
        }
      }
    });

    paths = paths.filter((path) => {
      return path.steps[index].x === minX && path.steps[index].y === minY;
    })
    minX = 1000000;
    minY = 1000000;

    paths.forEach((path) => {
      if (path.steps[1].y < minY) {
        appropriatePaths = new Array<iPath>();
        minY = path.steps[1].y;
        minX = path.steps[1].x;
        appropriatePaths.push(path);
      } else if (path.steps[1].y === minY) {
        if (path.steps[1].x < minX) {
          appropriatePaths = new Array<iPath>();
          minX = path.steps[1].x;
          appropriatePaths.push(path);
        } else if (path.steps[1].x === minX) {
          appropriatePaths.push(path);
        }
      }
    });

    return appropriatePaths;
  }

  private generatePaths(combatant: iCombatant, enemyLocations: iLocation[]): iPath[] {
    let paths = new Array<iPath>();
    let allPaths = new Array<iPath>();

    allPaths.push(<iPath>{
      steps: new Array<iLocation>()
    })

    allPaths[0].steps.push(<iLocation>{
      x: combatant.x,
      y: combatant.y
    });

    let allVisitedLocations = new Array<iLocation>();

    allVisitedLocations.push(<iLocation>{
      x: combatant.x,
      y: combatant.y
    })

    while (allPaths.filter((path) => {
      return path.encounterEnemy;
    }).length === 0 && allPaths.length > 0) {
      paths = new Array<iPath>();
      // copy all paths to path
      allPaths.forEach((p) => {
        paths.push(p);
      });

      // clear all paths
      allPaths = new Array<iPath>();

      // iterate paths into all paths
      paths.forEach((path) => {
        this.findNewPaths(path, enemyLocations, allVisitedLocations).forEach((path) => {
          if (allPaths.find((ap) => {
            // deduplicate paths.
            const length = path.steps.length;
            if (ap.steps.length === path.steps.length) {
              for (let i = 0; i < length; i++) {
                if (ap.steps[i].x !== path.steps[i].x) {
                  return false;
                }
                if (ap.steps[i].y !== path.steps[i].y) {
                  return false;
                }
              }

              return true;
            }
            else {
              return false;
            }

          }) === undefined) {
            allPaths.push(path);
          }
        });
      });

      allPaths.forEach((path) => {
        const index = path.steps.length - 1;
        const previsited = allVisitedLocations.find((loc) => {
          return loc.x === path.steps[index].x && loc.y === path.steps[index].y;
        });

        if (previsited === undefined) {
          allVisitedLocations.push(<iLocation>{
            x: path.steps[index].x,
            y: path.steps[index].y
          })
        }
      })
    }

    return allPaths;
  }

  private findNewPaths(path: iPath, enemyLocations: iLocation[], allVisitedLocations: iLocation[]): iPath[] {
    let newPaths = new Array<iPath>();
    const lastLocation = path.steps[path.steps.length - 1];
    if (this._cave[lastLocation.y][lastLocation.x - 1] === "." &&
      allVisitedLocations.find((loc) => {
        return loc.x === lastLocation.x - 1 && loc.y === lastLocation.y;
      }) === undefined) {
      let newPath = <iPath>{
        steps: path.steps.slice(0),
        encounterEnemy: path.encounterEnemy
      };

      const newLocation = <iLocation>{
        x: lastLocation.x - 1,
        y: lastLocation.y
      };

      if (newPath.steps.length == 3) {
        newPath.steps = newPath.steps.slice(0, 2);
      }

      newPath.steps.push(newLocation);
      newPath.encounterEnemy = this.hasFoundEnemy(newPath, enemyLocations);

      newPaths.push(newPath);
    }

    if (this._cave[lastLocation.y][lastLocation.x + 1] === "." &&
      allVisitedLocations.find((loc) => {
        return loc.x === lastLocation.x + 1 && loc.y === lastLocation.y;
      }) === undefined) {
      let newPath = <iPath>{
        steps: path.steps.slice(0),
        encounterEnemy: path.encounterEnemy
      };

      const newLocation = <iLocation>{
        x: lastLocation.x + 1,
        y: lastLocation.y
      };
      if (newPath.steps.length == 3) {
        newPath.steps = newPath.steps.slice(0, 2);
      }
      newPath.steps.push(newLocation);
      newPath.encounterEnemy = this.hasFoundEnemy(newPath, enemyLocations);

      newPaths.push(newPath);
    }

    if (this._cave[lastLocation.y - 1][lastLocation.x] === "." &&
      allVisitedLocations.find((loc) => {
        return loc.x === lastLocation.x && loc.y === lastLocation.y - 1;
      }) === undefined) {
      let newPath = <iPath>{
        steps: path.steps.slice(0),
        encounterEnemy: path.encounterEnemy
      };

      const newLocation = <iLocation>{
        x: lastLocation.x,
        y: lastLocation.y - 1
      };

      if (newPath.steps.length == 3) {
        newPath.steps = newPath.steps.slice(0, 2);
      }

      newPath.steps.push(newLocation);
      newPath.encounterEnemy = this.hasFoundEnemy(newPath, enemyLocations);

      newPaths.push(newPath);
    }

    if (this._cave[lastLocation.y + 1][lastLocation.x] === "." &&
      allVisitedLocations.find((loc) => {
        return loc.x === lastLocation.x && loc.y === lastLocation.y + 1;
      }) === undefined) {
      let newPath = <iPath>{
        steps: path.steps.slice(0),
        encounterEnemy: path.encounterEnemy
      };

      if (newPath.steps.length == 3) {
        newPath.steps = newPath.steps.slice(0, 2);
      }

      const newLocation = <iLocation>{
        x: lastLocation.x,
        y: lastLocation.y + 1
      };

      newPath.steps.push(newLocation);
      newPath.encounterEnemy = this.hasFoundEnemy(newPath, enemyLocations);

      newPaths.push(newPath);
    }

    return newPaths;
  }

  private hasFoundEnemy(newPath: iPath, enemyLocations: iLocation[]): boolean {
    return enemyLocations.filter((location) => {
      if (newPath.steps[newPath.steps.length - 1].x === location.x &&
        newPath.steps[newPath.steps.length - 1].y === location.y) {
        return true;
      } else {
        return false;
      }
    }).length >= 1;

  }

  private findEnemyLocations(combatant: iCombatant): iLocation[] {
    let locations = new Array<iLocation>();

    this._combatants.filter((comb) => {
      return comb.type !== combatant.type && comb.health > 0;
    }).forEach((com) => {
      if (this._cave[com.y][com.x + 1] === ".") {
        locations.push(<iLocation>{
          x: com.x + 1,
          y: com.y
        });
      }
      if (this._cave[com.y][com.x - 1] === ".") {
        locations.push(<iLocation>{
          x: com.x - 1,
          y: com.y
        });
      }
      if (this._cave[com.y + 1][com.x] === ".") {
        locations.push(<iLocation>{
          x: com.x,
          y: com.y + 1
        });
      }
      if (this._cave[com.y - 1][com.x] === ".") {
        locations.push(<iLocation>{
          x: com.x,
          y: com.y - 1
        });
      }
    })

    return locations;
  }

  private isInRange(combatant: iCombatant) {
    const enemy = combatant.type === type.elf ? "G" : "E";

    if (this._cave[combatant.y + 1][combatant.x] === enemy ||
      this._cave[combatant.y - 1][combatant.x] === enemy ||
      this._cave[combatant.y][combatant.x + 1] === enemy ||
      this._cave[combatant.y][combatant.x - 1] === enemy) {
      return true;
    }

    return false;
  }

  private sortCombatants() {
    this._combatants.sort((a, b) => {
      if (a.y < b.y) {
        return -1;
      } else if (a.y > b.y) {
        return 1;
      } else {
        if (a.x < b.x) {
          return -1;
        } else if (a.x > b.x) {
          return 1
        } else {
          return 0;
        }
      }
    });
  }

  private init() {
    this._roundCount = 0;
    this._cave = new Array<Array<string>>();
    this._combatants = new Array<iCombatant>();
    this._elfDeath = false;

    let x = -1;
    let y = -1;
    let id = 1;
    this.inputString.split("\n").forEach((row) => {
      y++;
      x = -1;
      let newRow = new Array<string>();

      row.split("").forEach((cell) => {
        x++
        if (cell === "E" || cell === "G") {
          this._combatants.push(<iCombatant>{
            id: id,
            health: 200,
            type: cell === "E" ? type.elf : type.goblin,
            x: x,
            y: y
          });

          id++
        }

        newRow.push(cell);
      });

      this._cave.push(newRow);
    });
  }

  private openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { cave: this._cave, combatants: this._combatants, elfAttack: this._elfAttack };

    const dialogRef = this.dialog.open(GameDisplayComponent, dialogConfig);

    this.child = dialogRef.componentInstance;
    dialogRef.componentInstance.iterateParent.subscribe((data: any) => {
      this.iterate();
    })

    dialogRef.componentInstance.togglePause.subscribe(() => {
      this._paused = !this._paused;
    });
  }
}

export interface iCombatant {
  id: number,
  type: type,
  health: number,
  x: number,
  y: number
}

interface iPath {
  steps: iLocation[],
  encounterEnemy: boolean
}

interface iLocation {
  x: number,
  y: number
}

export enum type {
  elf,
  goblin
}