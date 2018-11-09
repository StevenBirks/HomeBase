import { Component } from '@angular/core';
import { AdventOfCodeService } from '../../advent-of-code.service';
import { DayBlockBaseComponent } from '../../day-block/day-block-base.component';

@Component({
  selector: 'app-day-block-2015',
  templateUrl: './day-block.component.html'
})

export class DayBlock_2015Component extends DayBlockBaseComponent {

  constructor(protected adventService: AdventOfCodeService) {
    super(adventService, 2015);
  }
}
