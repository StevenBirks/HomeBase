import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MatTableDataSource, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  constructor() {
   }

   @ViewChild(MatSort) sort: MatSort;

  lessons: iLesson[];
  lessonsDataSource: MatTableDataSource<iLesson>;

  private lessonsSubject = new BehaviorSubject<iLesson[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean>;

  ngOnInit() {
    this.lessonsDataSource = new MatTableDataSource();
    this.lessons = new Array<iLesson>();
    this.lessonsDataSource.data = this.lessons;
    this.loading$ = this.loadingSubject.asObservable(); 
    this.lessonsDataSource.data = this.lessons;
    this.lessonsDataSource.sort = this.sort;

    this.connect();
    
    let newLesson1 = <iLesson> {
      description: "Lesson 1 description",
      duration: "4:15",
      seqNo: 1
    };
    let newLesson2 = <iLesson> {
      description: "Lesson 2 description",
      duration: "3:28",
      seqNo: 2
    }
    let newLesson3 = <iLesson> {
      description: "Lesson 3 description",
      duration: "5:01",
      seqNo: 3
    };

    this.loadingSubject.next(true);

    window.setTimeout(() => {
      this.lessons.push(newLesson1);
      this.lessons.push(newLesson2);

      this.lessonsDataSource.data = this.lessons; 
    }, 3000)

    window.setTimeout(() => {
      this.lessons.push(newLesson3);
      
      this.lessonsDataSource.data = this.lessons; 
      this.loadingSubject.next(false);

      this.disconnect();
    }, 5000)
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.lessonsDataSource.filter = filterValue;
  }

  private connect(): Observable<iLesson[]> {
    return this.lessonsSubject.asObservable();
  }

  private disconnect(): void {
    this.lessonsSubject.complete();
    this.loadingSubject.complete();
  }
}

interface iLesson {
  seqNo: number,
  description: string,
  duration: string,
}


