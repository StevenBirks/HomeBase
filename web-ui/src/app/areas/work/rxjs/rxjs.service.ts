import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {

  constructor(private http: HttpClient) { }

  private API_URL = environment.apiUrl;
  private rxjsTestUrl = `${this.API_URL}/api/rxjsTest`;

  getData1(): Observable<string[]> {
    return this.http.get<string[]>(`${this.rxjsTestUrl}`);
  }
}
