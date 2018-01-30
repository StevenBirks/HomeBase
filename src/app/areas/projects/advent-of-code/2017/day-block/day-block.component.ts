import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-block-2017',
  templateUrl: './day-block.component.html',
  styleUrls: ['./day-block.component.scss']
})
export class DayBlockComponent implements OnInit {

  public day1: string;
  public day13_5: string;
  public day1IsCopied: boolean;
  public day13_5IsCopied: boolean;


  constructor() {
    this.day1 = "F:\\Common\\Steve\\Programming\\Projects\\HomeBase\\src\\app\\areas\\projects\\advent-of-code\\powershell";
    this.day13_5 = "F:\\Common\\Steve\\Programming\\Projects\\HomeBase\\src\\app\\areas\\projects\\advent-of-code\\powershell";
   }

  ngOnInit() {
  }

}
