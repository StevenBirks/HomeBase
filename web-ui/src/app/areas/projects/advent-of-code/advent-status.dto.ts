import { AdventDayDto } from './advent-day.dto';

export class AdventStatusDto {
    adventDay: AdventDayDto;
    startedP1: boolean;
    startedP2: boolean;
    completedP1: boolean;
    completedP2: boolean;
}
