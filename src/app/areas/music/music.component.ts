import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { MusicTilesService } from './music.tiles.service';
import { iTile } from '../../shared/interfaces/tile.interface';


@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  constructor(private musicTileService: MusicTilesService) { }

  tiles: iTile[];

  ngOnInit() {
    console.log(this.musicTileService.musicTiles);

    this.tiles = new Array<iTile>();

    this.tiles = this.musicTileService.musicTiles;
  }
}
