import { Component } from '@angular/core';
import { AdventClient } from '../../../../../../generated/web.api';
import { DayBlockBaseComponent } from '../../day-block/day-block-base.component';

@Component({
  selector: 'app-day-block-2016',
  templateUrl: './day-block.component.html'
})

export class DayBlock_2016Component extends DayBlockBaseComponent {
  public day1: string;
  public day1IsCopied: boolean;

  constructor(protected adventClient: AdventClient) {
    super(adventClient, 2016);

    this.day1 = "F:\\Common\\Steve\\Programming\\Projects\\HomeBase\\src\\app\\areas\\projects\\advent-of-code\\powershell";

  }
}
