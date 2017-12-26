import { NgModule } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavComponent
    ],
  exports: [
    NavComponent
    ],
  imports: [    
      CommonModule,
      RouterModule
  ],
})
export class SharedModule { }
