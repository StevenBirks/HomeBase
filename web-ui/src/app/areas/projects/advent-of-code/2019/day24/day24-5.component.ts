import { Component } from '@angular/core';

@Component({
  selector: 'app-2019-day24-5',
  templateUrl: './day24-5.component.html'
})
export class Day24_5_2019Component {
  constructor() { }

  public inputString: string;
  public answer: number;

  private _grid: iGridLayer[];
  private _iterations: number;
  private _idNext: number;

  public calculate(): void {
    this.init();

    this.iterate();
  }

  private getNextId(): number {
    this._idNext++;

    return this._idNext - 1;
  }

  private init() {
    this._grid = new Array<iGridLayer>();
    this._iterations = 0;
    this._idNext = 1;

    const newGridLayer = {
      id: this.getNextId(),
      containedWithin: null,
      contains: null,
      cells: new Array<iGridCell>()
    } as iGridLayer;

    const rows = this.inputString.split('\n');

    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].split('');

      for (let j = 0; j < cells.length; j++) {
        if (i === 2 && j === 2) {
        } else {
          newGridLayer.cells.push({x: j, y: i, value: cells[j]} as iGridCell);
        }
      }
    }

    this._grid.push(newGridLayer);

    console.log(this._grid);
  }

  private iterate() {
    const tempGrid = JSON.parse(JSON.stringify(this._grid)) as iGridLayer[];
    this._iterations++;
    const gridLength = this._grid.length;

    for (let z = 0; z < gridLength + 2; z++) {
      const outer = this.getOuterLayer(this._grid[z], tempGrid);
      const inner = this.getInnerLayer(this._grid[z], tempGrid);

      for (let c = 0; c < this._grid[0].cells.length; c++) {
        let count = 0;

        // -x
        if (this._grid[z].cells[c].x === 0) {
          const outerCell = outer.cells.find((cell) => {
            return cell.x === 1 && cell.y === 2;
          });

          if (outerCell.value === '#') {
            count++;
          }
        } else if (this._grid[z].cells[c].x === 3 && this._grid[z].cells[c].y === 2) {
          const innerCells = inner.cells.filter((cell) => {
            return cell.x === 4;
          });

          innerCells.forEach((cell) => {
            if (cell.value === '#') {
              count++;
            }
          });
        }  else {
          const leftCell = this._grid[z].cells.find((cell) => {
            return cell.x === this._grid[z].cells[c].x - 1 &&
            cell.y === this._grid[z].cells[c].y;
          });

          if (leftCell.value === '#') {
            count++;
          }
        }

        // +x
        if (this._grid[z].cells[c].x === 4) {
          const outerCell = outer.cells.find((cell) => {
            return cell.x === 3 && cell.y === 2;
          });

          if (outerCell.value === '#') {
            count++;
          }
        } else if (this._grid[z].cells[c].x === 1 && this._grid[z].cells[c].y === 2) {
          const innerCells = inner.cells.filter((cell) => {
            return cell.x === 0;
          });

          innerCells.forEach((cell) => {
            if (cell.value === '#') {
              count++;
            }
          });
        }  else {
          const rightCell = this._grid[z].cells.find((cell) => {
            return cell.x === this._grid[z].cells[c].x + 1 &&
            cell.y === this._grid[z].cells[c].y;
          });

          if (rightCell.value === '#') {
            count++;
          }
        }

        // -y
        if (this._grid[z].cells[c].y === 0) {
          const outerCell = outer.cells.find((cell) => {
            return cell.x === 2 && cell.y === 1;
          });

          if (outerCell.value === '#') {
            count++;
          }
        } else if (this._grid[z].cells[c].y === 3 && this._grid[z].cells[c].x === 2) {
          const innerCells = inner.cells.filter((cell) => {
            return cell.y === 4;
          });

          innerCells.forEach((cell) => {
            if (cell.value === '#') {
              count++;
            }
          });
        }  else {
          const upperCell = this._grid[z].cells.find((cell) => {
            return cell.y === this._grid[z].cells[c].y - 1 &&
            cell.x === this._grid[z].cells[c].x;
          });

          if (upperCell.value === '#') {
            count++;
          }
        }

        // +y
        if (this._grid[z].cells[c].y === 4) {
          const outerCell = outer.cells.find((cell) => {
            return cell.x === 2 && cell.y === 3;
          });

          if (outerCell.value === '#') {
            count++;
          }
        } else if (this._grid[z].cells[c].y === 1 && this._grid[z].cells[c].x === 2) {
          const innerCells = inner.cells.filter((cell) => {
            return cell.y === 0;
          });

          innerCells.forEach((cell) => {
            if (cell.value === '#') {
              count++;
            }
          });
        }  else {
          const lowerCell = this._grid[z].cells.find((cell) => {
            return cell.y === this._grid[z].cells[c].y + 1 &&
            cell.x === this._grid[z].cells[c].x;
          });

          if (lowerCell.value === '#') {
            count++;
          }
        }

        if (this._grid[z].cells[c].value === '#' && count !== 1) {
          tempGrid[z].cells[c].value = '.';
        } else if (this._grid[z].cells[c].value === '.' && (count === 1 || count === 2)) {
          tempGrid[z].cells[c].value = '#';
        }
      }
    }

    this._grid = tempGrid;

    if (this._iterations < 200) {
      window.setTimeout(() => {
        this.iterate();
      }, 1);
    } else {
      this.answer = this.countBugs();
    }
  }

  private getOuterLayer(inner: iGridLayer, tempGrid: iGridLayer[]): iGridLayer {
    let existingLayer = this._grid.find((layer) => {
      return layer.contains === inner.id;
    });

    if (existingLayer === undefined) {
      this.generateOuter(inner, tempGrid);
      existingLayer = this._grid.find((layer) => {
        return layer.contains === inner.id;
      });
    }

    return existingLayer;
  }

  private getInnerLayer(outer: iGridLayer, tempGrid: iGridLayer[]): iGridLayer {
    let existingLayer = this._grid.find((layer) => {
      return layer.containedWithin === outer.id;
    });

    if (existingLayer === undefined) {
      this.generateInner(outer, tempGrid);
      existingLayer = this._grid.find((layer) => {
        return layer.containedWithin === outer.id;
      });
    }

    return existingLayer;
  }

  private generateOuter(innerGridLayer: iGridLayer, tempGrid: iGridLayer[]) {
    const newGridLayer = {
      id: this.getNextId(),
      cells: new Array<iGridCell>(),
      containedWithin: null,
      contains: innerGridLayer.id
    } as iGridLayer;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2) {
        } else {
          newGridLayer.cells.push({x: j, y: i, value: '.'} as iGridCell);
        }
      }
    }

    innerGridLayer.containedWithin = newGridLayer.id;
    tempGrid.find((o) => {
      return o.id === innerGridLayer.id;
    }).containedWithin = newGridLayer.id;

    this._grid.push(newGridLayer);
    tempGrid.push(JSON.parse(JSON.stringify(newGridLayer)));

  }

  private generateInner(gridLayer: iGridLayer, tempGrid: iGridLayer[]) {
    const newGridLayer = {
      id: this.getNextId(),
      cells: new Array<iGridCell>(),
      containedWithin: gridLayer.id,
      contains: null
    } as iGridLayer;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2) {
        } else {
          newGridLayer.cells.push({x: j, y: i, value: '.'} as iGridCell);
        }
      }
    }

    gridLayer.contains = newGridLayer.id;

    tempGrid.find((o) => {
      return o.id === gridLayer.id;
    }).contains = newGridLayer.id;

    this._grid.push(newGridLayer);
    tempGrid.push(JSON.parse(JSON.stringify(newGridLayer)));
  }

  private countBugs(): number {
    let bugs = 0;

    this._grid.forEach((layer) => {
      layer.cells.forEach((cell) => {
        if (cell.value === '#') {
          bugs++;
        }
      });
    });

    return bugs;
  }
}

interface iGridCell {
  x: number;
  y: number;
  value: string;
}

interface iGridLayer {
  id: number;
  containedWithin: number;
  contains: number;
  cells: iGridCell[];
}
