import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, of, from, fromEvent, concat } from 'rxjs';
import { RxjsService } from './rxjs.service';
import { firstData } from './rxjs.data';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit, AfterViewInit {

  rxjsService: RxjsService;
  firstHttpData: string[];
  firstFileData: string[];
  eventData: any;
  firstEventData: string;
  firstEventDataCount: number;
  ofValues: any;
  fromValues: string[];
  concatValues: any;
  operatorResults1: any;
  shorthandPipes: any;

  constructor(rxjsService: RxjsService) {
    this.rxjsService = rxjsService;
  }

  ngOnInit() {
    this.firstHttpData = new Array<string>();
    this.firstFileData = new Array<string>();
    this.firstEventDataCount = 0;
    this.ofValues = new Array<any>();
    this.fromValues = new Array<string>();
    this.concatValues = new Array<any>();

    // Operators
    this.operatorResults1 = new Array<number>();
    this.shorthandPipes = new Array<number>();
  }

  ngAfterViewInit() {
    this.beginFetchData();
    this.beginOperatoring();
  }

  beginFetchData() {
    // file
    let firstDataObservable$ = Observable.create((subscriber) => {
      for (let value of firstData) {
        subscriber.next(value);
      }
    });

    firstDataObservable$.subscribe((value) => {
      this.firstFileData.push(value);
    });

    // http
    this.rxjsService.getData1()
      .subscribe((data) => {
        this.firstHttpData = data;
      }, (error: any) => {
        console.log(`${error}`);
      }, () => {
        console.log(`Complete!`);
      });

    // event
    let eventButton = document.getElementById('eventButton');

    fromEvent(eventButton, 'click')
      .subscribe((event) => {
        this.firstEventDataCount++;
        this.firstEventData = `Button click count: ${this.firstEventDataCount}`;
      });

    // of
    let source1$ = of('hello', 10, true, firstData[0]);

    source1$.subscribe((value) => {
      this.ofValues.push(value);
    })

    // from 
    let source2$ = from(firstData);

    source2$.subscribe((value) => {
      this.fromValues.push(value);
    });

    // concat
    concat(source1$, source2$).subscribe((value) => {
      this.concatValues.push(value);
    });

    // subscribing with an observer
    let myObserver = {
      next: value => `NEXT: ${value}`,
      error: err => `ERROR: ${err}`,
      complete: () => `COMPLETE`
    };

    let sourceObservable$ = of(1, 1, 2, 3, 5, 8, 13);
    sourceObservable$.subscribe(myObserver);
  }

  beginOperatoring() {
    // longhand
    let source$ = of(1, 1, 2, 3, 5, 8, 13, 21);
    let doubler = map((value: number) => value * 2);
    let doubled$ = doubler(source$);

    doubled$.subscribe((value:number) => {
      this.operatorResults1.push(value);
    });

    // shorthand
    source$.pipe(
      map(value => value * 2),
      filter(mappedValue => mappedValue > 5)
    )
    .subscribe(
      finalValue => this.shorthandPipes.push(finalValue)
    )
  }
}
