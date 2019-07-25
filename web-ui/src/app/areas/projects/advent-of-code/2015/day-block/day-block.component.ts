import { Component } from '@angular/core';
import { DayBlockBaseComponent } from '../../day-block/day-block-base.component';
import { AdventClient } from '../../../../../../generated/web.api';

@Component({
  selector: 'app-day-block-2015',
  templateUrl: './day-block.component.html'
})

export class DayBlock_2015Component extends DayBlockBaseComponent {

  constructor(protected adventClient: AdventClient) {
    super(adventClient, 2015);
  }
}
