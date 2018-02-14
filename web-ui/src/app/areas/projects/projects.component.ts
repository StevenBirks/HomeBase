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
  }

  addAdventOfCodeTile() {
    this.projectsTileService.addTile(<iTile>{
      colour: "green",
      description: "advent of code stuffs",
      header: "Advent Of Code",
      imageUrl: "url('../../../../assets/piano-opaque.png')",
      linkUrl: "advent-of-code"
    });
  }
}
