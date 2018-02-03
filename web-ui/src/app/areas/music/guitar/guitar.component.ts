import { Component, OnInit } from '@angular/core';
import { MusicTilesService } from '../music.tiles.service';
import { iTile } from '../../../shared/interfaces/tile.interface';

@Component({
  selector: 'app-guitar',
  templateUrl: './guitar.component.html',
  styleUrls: ['./guitar.component.scss']
})
export class GuitarComponent implements OnInit {

  constructor(private musicTilesService:MusicTilesService) { }

  ngOnInit() {
    this.musicTilesService.addTile(<iTile> {
      colour: "yellow",
      description: "Guitar tile description",
      header: "Guitar",
      imageUrl: "some css url",
      linkUrl: "link to guitar page"
    });
  }
}
