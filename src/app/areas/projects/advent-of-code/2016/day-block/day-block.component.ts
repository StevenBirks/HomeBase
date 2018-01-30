import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-block-2016',
  templateUrl: './day-block.component.html',
  styleUrls: ['./day-block.component.scss']
})
export class DayBlock_2016Component implements OnInit {

  public day1: string;
  public day1IsCopied: boolean;


  constructor() {
    this.day1 = "F:\\Common\\Steve\\Programming\\Projects\\HomeBase\\src\\app\\areas\\projects\\advent-of-code\\powershell";
   }

  ngOnInit() {
  }

}
