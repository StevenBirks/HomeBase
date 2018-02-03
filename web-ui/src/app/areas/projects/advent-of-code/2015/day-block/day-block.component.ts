import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-block-2015',
  templateUrl: './day-block.component.html',
  styleUrls: ['./day-block.component.scss']
})
export class DayBlock_2015Component implements OnInit {

  // public days: iDay[];

  constructor() {
   }

  ngOnInit() {
    // this.days = new Array<iDay>();

    // for (let i = 25; i > 0; i--) {
    //   let newDay = <iDay> {
    //     day: `${i}`,
    //     dayCompleted: false,
    //     dayPt2: `${i}.5`,
    //     dayPt2Completed: false,
    //     component: `<app-2015-day${i}></app-2015-day${i}>`,
    //     componentPt2: `<app-2015-day${i}-5></app-2015-day${i}-5>`,
    //   };

    //   this.days.push(newDay);
    // }
  }
}

// interface iDay {
//   day: string,
//   dayCompleted: boolean,
//   dayPt2: string,
//   dayPt2Completed: boolean,
//   component: string,
//   componentPt2: string
// }
