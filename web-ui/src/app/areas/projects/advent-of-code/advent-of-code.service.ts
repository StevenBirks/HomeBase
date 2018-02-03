import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AdventStatusDto } from './advent-status.dto';
import { environment } from '../../../../environments/environment';
import { AdventDayDto } from './advent-day.dto';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AdventOfCodeService {

  constructor(private http: HttpClient) { }

  private API_URL = environment.apiUrl;
  private adventUrl = `${this.API_URL}/api/advent`;

  getAdventStatusForYear(year: number): Observable<AdventStatusDto[]> {
    return this.http.get<AdventStatusDto[]>(`${this.adventUrl}/advent-statuses?year=${year}`);
  }
}
