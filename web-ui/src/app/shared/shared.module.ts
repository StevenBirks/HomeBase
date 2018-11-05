import { NgModule } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';
import { TileComponent } from './tile/tile.component';
import { PrintService } from './print/print.service';

@NgModule({
  declarations: [
    NavComponent,
    TileComponent,
    ],
  exports: [
    NavComponent,
    TileComponent
    ],
  imports: [    
    CommonModule,
    RouterModule
  ],
  providers: [
    PrintService
  ]
})
export class SharedModule { }
