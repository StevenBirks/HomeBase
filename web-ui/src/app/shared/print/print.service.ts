import { Injectable } from '@angular/core';

@Injectable()
export class PrintService {

public print(printEl: HTMLElement) {
    window.print();
  }
}