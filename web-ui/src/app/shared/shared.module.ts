import { NgModule } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TileComponent } from './tile/tile.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { PrintService } from './print/print.service';
import { TreeComponent } from './tree/tree.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
  declarations: [
    NavComponent,
    TileComponent,
    MainNavComponent,
    TreeComponent,
    ],
  exports: [
    NavComponent,
    MainNavComponent,
    TileComponent,
    TreeComponent  
    ],
  imports: [    
    CommonModule,
    RouterModule,
    LayoutModule,
    AngularMaterialModule
  ],
  providers: [
    PrintService
  ]
})
export class SharedModule { }
