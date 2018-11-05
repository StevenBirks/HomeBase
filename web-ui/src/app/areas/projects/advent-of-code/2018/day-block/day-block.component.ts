import { Component, OnInit, Input } from '@angular/core';
import { AdventStatusDto } from '../../advent-status.dto';
import { AdventOfCodeService } from '../../advent-of-code.service';

@Component({
  selector: 'app-day-block-2018',
  templateUrl: './day-block.component.html',
  styleUrls: ['./day-block.component.scss']
})

export class DayBlock_2018Component implements OnInit {

  constructor(private adventService: AdventOfCodeService) {
    this.adventStatuses = new Array<AdventStatusDto>();
  }

  public adventStatuses: AdventStatusDto[];
  public loading: boolean;

  ngOnInit() {
    this.getStatusesForYear(2018);
  }

  getStatusesForYear(year: number) {
    this.loading = true;
    this.adventService.getAdventStatusForYear(year)
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

