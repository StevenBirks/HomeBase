import { Component, OnInit, Input } from '@angular/core';
import { iTile } from '../interfaces/tile.interface';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  constructor() { }

  @Input() tile: iTile;

  ngOnInit() {
  }

}
