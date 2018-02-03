import { Injectable } from '@angular/core';
import { iTile } from '../../shared/interfaces/tile.interface';

@Injectable()
export class MusicTilesService {

  constructor() {
    this.musicTiles = new Array<iTile>();
   }

  musicTiles: iTile[];

  addTile(newTile: iTile) {
    this.musicTiles.push(newTile);
  }
}

