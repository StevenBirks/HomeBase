import { Component, OnInit } from '@angular/core';
import { MusicTilesService } from './music.tiles.service';
import { iTile } from '../../shared/interfaces/tile.interface';


@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  constructor(private musicTileService: MusicTilesService) {
    this.tiles = new Array<iTile>();
  }

  tiles: iTile[];

  ngOnInit() {
    this.addAllTiles();
    this.tiles = this.musicTileService.musicTiles;
  }

  addAllTiles() {
    this.addPianoTile();
    this.addGuitarTile();
    this.addDrumsTile();
    this.addDrumsTile();
    this.addViolinTile();
  }

  addPianoTile() {
    this.musicTileService.addTile(<iTile>{
      colour: "rgba(82, 79, 252, 0.4)",
      description: "piano stuffs",
      header: "Piano",
      imageUrl: "url('../../../../assets/piano-opaque.png')",
      linkUrl: "piano"
    });
  }

  addGuitarTile() {
    this.musicTileService.addTile(<iTile>{
      colour: "yellow",
      description: "guitar stuffs",
      header: "Guitar",
      imageUrl: "url('../../../../assets/guitar-opaque.png')",
      linkUrl: "guitar"
    });
  }

  addDrumsTile() {
    this.musicTileService.addTile(<iTile>{
      colour: "red",
      description: "drums stuffs",
      header: "Drums",
      imageUrl: "url('../../../../assets/drums-opaque.png')",
      linkUrl: "drums"
    });
  }

  addViolinTile() {
    this.musicTileService.addTile(<iTile>{
      colour: "green",
      description: "violin stuffs",
      header: "Violin",
      imageUrl: "url('../../../../assets/violin-opaque.png')",
      linkUrl: "violin"
    });
  }  
}
