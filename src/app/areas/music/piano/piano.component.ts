import { Component, OnInit } from '@angular/core';
import { MusicTilesService } from '../music.tiles.service';
import { iTile } from '../../../shared/interfaces/tile.interface';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.scss']
})
export class PianoComponent implements OnInit {

  constructor(private musicTilesService:MusicTilesService) { }

  ngOnInit() {
    this.musicTilesService.addTile(<iTile> {
      colour: "blue",
      description: "Piano tile description",
      header: "Piano",
      imageUrl: "some css url",
      linkUrl: "link to piano page"
    });
  }
}