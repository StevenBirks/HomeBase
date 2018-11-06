import { NgModule } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TileComponent } from './tile/tile.component';
<<<<<<< HEAD
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
=======
import { PrintService } from './print/print.service';
>>>>>>> 33fc260385c276dc2ec5805ebeb269950a9ffd27

@NgModule({
  declarations: [
    NavComponent,
    TileComponent,
    MainNavComponent,
    ],
  exports: [
    NavComponent,
    MainNavComponent,
    TileComponent    
    ],
  imports: [    
    CommonModule,
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    PrintService
  ]
})
export class SharedModule { }
