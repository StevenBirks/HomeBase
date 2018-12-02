import { Component, OnInit } from '@angular/core';
import { iTile } from '../../shared/interfaces/tile.interface';
import { ProjectsTilesService } from './projects.tiles.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private projectsTileService: ProjectsTilesService) {
    this.tiles = new Array<iTile>();
  }

  tiles: iTile[];

  ngOnInit() {
    this.addAllTiles();
    this.tiles = this.projectsTileService.projectsTiles;
  }

  addAllTiles() {
    this.addAdventOfCodeTile();
    this.addStorageLabellingTile();
  }

  addAdventOfCodeTile() {
    this.projectsTileService.addTile(<iTile>{
      colour: "green",
      description: "advent of code stuffs",
      header: "Advent Of Code",
      imageUrl: "url('../../../../assets/aoc.png')",
      linkUrl: "advent-of-code"
    });
  }

  addStorageLabellingTile() {
    this.projectsTileService.addTile(<iTile>{
      colour: "#FF5733",
      description: "label creation for storage",
      header: "Storage labels",
      imageUrl: "url('../../../../assets/storage-opaque.png')",
      linkUrl: "storage-labelling"
    });
  }
}
