import { Component } from '@angular/core';
import { AdventClient } from '../../../../../../generated/web.api';
import { DayBlockBaseComponent } from '../../day-block/day-block-base.component';

@Component({
  selector: 'app-day-block-2017',
  templateUrl: './day-block.component.html'
})

export class DayBlock_2017Component extends DayBlockBaseComponent {

  public day1: string;
  public day13_5: string;
  public day1IsCopied: boolean;
  public day13_5IsCopied: boolean;

  constructor(protected adventClient: AdventClient) {
    super(adventClient, 2017);

    this.day1 = "F:\\Common\\Steve\\Programming\\Projects\\HomeBase\\web-ui\\src\\app\\areas\\projects\\advent-of-code\\2017\\powershell";
    this.day13_5 = "F:\\Common\\Steve\\Programming\\Projects\\HomeBase\\web-ui\\src\\app\\areas\\projects\\advent-of-code\\2017\\powershell";
  }
}

