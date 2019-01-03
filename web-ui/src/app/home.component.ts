import { Component, OnInit } from '@angular/core';
////import { environment } from '../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ////public API_URL: string;
  ////public env: string;

  ngOnInit() {
    ////this.API_URL = environment.apiUrl;
    ////this.env = environment.production ? 'production' : 'development'
  }
}
