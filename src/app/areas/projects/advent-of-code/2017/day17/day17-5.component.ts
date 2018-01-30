import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day17-5',
  templateUrl: './day17-5.component.html'
})
export class Day17_5Component implements OnInit {

  public inputNumber: number;
  public answer: number;
  public finished: string;

  private _position: number;
  
  ngOnInit() {
  }

  public calculate(): void {
    this.answer = -1;
    let curPos = 0;
    for(let n = 1; n < 50000000; n++) {
        curPos = (curPos + this.inputNumber)%n + 1
        if (curPos === 1) this.answer = n;
    }
    this.answer =  this.answer;  
  }

}
