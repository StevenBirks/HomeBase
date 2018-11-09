import { Component } from '@angular/core';
import { AdventOfCodeService } from '../../advent-of-code.service';
import { DayBlockBaseComponent } from '../../day-block/day-block-base.component';

@Component({
  selector: 'app-day-block-2016',
  templateUrl: './day-block.component.html'
})

export class DayBlock_2016Component extends DayBlockBaseComponent {
  public day1: string;
  public day1IsCopied: boolean;

  constructor(protected adventService: AdventOfCodeService) {
    super(adventService, 2016);

    this.day1 = "F:\\Common\\Steve\\Programming\\Projects\\HomeBase\\src\\app\\areas\\projects\\advent-of-code\\powershell";

  }
}
