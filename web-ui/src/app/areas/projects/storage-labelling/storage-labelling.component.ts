import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PrintService } from '../../../shared/print/print.service';

@Component({
  selector: 'app-storage-labelling',
  templateUrl: './storage-labelling.component.html',
  styleUrls: ['./storage-labelling.component.css']
})
export class StorageLabellingComponent implements OnInit {

  constructor(private printService: PrintService) { }

  ngOnInit() {
  }

  printWindow() {
    // This thing will need a modal panel to block other things from printing.
    ////const elementToPrint: HTMLElement = document.querySelector('#printEl');

    ////this.printService.print(elementToPrint);
  }
}
