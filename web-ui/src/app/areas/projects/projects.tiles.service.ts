import { Injectable } from '@angular/core';
import { iTile } from '../../shared/interfaces/tile.interface';

@Injectable()
export class ProjectsTilesService {

  constructor() {
    this.projectsTiles = new Array<iTile>();
  }

  projectsTiles: iTile[];

  addTile(newTile: iTile) {
    if (this.projectsTiles.filter((tile) => {
      return tile.linkUrl == newTile.linkUrl;
    }).length === 0) {
      this.projectsTiles.push(newTile);
    }
  }

  clearTiles() {
    this.projectsTiles = new Array<iTile>();
  }
}

