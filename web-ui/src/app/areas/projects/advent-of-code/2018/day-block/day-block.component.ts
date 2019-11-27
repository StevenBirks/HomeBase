import { Component } from '@angular/core';
import { AdventClient } from '../../../../../../generated/web.api';
import { DayBlockBaseComponent } from '../../day-block/day-block-base.component';

@Component({
  selector: 'app-day-block-2018',
  templateUrl: './day-block.component.html'
})

export class DayBlock_2018Component extends DayBlockBaseComponent {

  constructor(protected adventClient: AdventClient) {
    super(adventClient, 2018);
  }
}
