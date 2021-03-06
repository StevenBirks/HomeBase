import { Injectable } from '@angular/core';
import { iTile } from '../../shared/interfaces/tile.interface';

@Injectable()
export class MusicTilesService {

  constructor() {
    this.musicTiles = new Array<iTile>();
  }

  musicTiles: iTile[];

  addTile(newTile: iTile) {
    if (this.musicTiles.filter((tile) => {
      return tile.linkUrl == newTile.linkUrl;
    }).length === 0) {
      this.musicTiles.push(newTile);
    }
  }

  clearTiles() {
    this.musicTiles = new Array<iTile>();
  }
}

