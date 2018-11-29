import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { environment } from '../../../environments/environment';
import { DirectoryTreeDto } from './directoryTree.dto';

@Injectable({
  providedIn: 'root'
})

export class TreeService {

  constructor(private http: HttpClient) { }

  private API_URL = environment.apiUrl;
  private directoryUrl = `${this.API_URL}/api/directory`;

  getDirectoryTreeData(subLocation: string): Observable<DirectoryTreeDto[]> {
    return this.http.get<DirectoryTreeDto[]>(`${this.directoryUrl}/tree/?sublocation=${subLocation}`);
  }
}
