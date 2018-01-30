import { NgModule } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    NavComponent,
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
