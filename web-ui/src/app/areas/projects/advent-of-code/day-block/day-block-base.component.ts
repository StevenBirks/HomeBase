import { Component } from '@angular/core';
//import { AdventOfCodeService } from '../advent-of-code.service';
import { AdventStatusDto } from '../advent-status.dto';
import { AdventClient } from '../../../../../generated/web.api';

@Component({
  selector: 'base-day-block',
  templateUrl: './day-block-base.component.html',
  styleUrls: ['./day-block-base.component.scss']
})
export class DayBlockBaseComponent  {

  constructor(adventClient: AdventClient, year: number) {
    this.year = year;
    this.adventStatuses = new Array<AdventStatusDto>();
    this._adventClient = adventClient;
  }

  public year: number;
  public adventStatuses: AdventStatusDto[];
  public loading: boolean;
  protected _adventClient: AdventClient;

  ngOnInit() {
    this.getStatusesForYear(this.year);
  }

  getStatusesForYear(year: number) {
    this.loading = true;
    this._adventClient.get(year)
      .subscribe((statuses: AdventStatusDto[]) => {
        this.adventStatuses = statuses;
        this.loading = false;
      });
  }

  getStatusForDay(day: number): AdventStatusDto {
    const result = this.adventStatuses.find((status) => {
      return status.adventDay.day === day;
    });

    return result;
  }

}
