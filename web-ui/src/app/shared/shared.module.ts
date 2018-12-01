import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TileComponent } from './tile/tile.component';
import { LayoutModule } from '@angular/cdk/layout';
import { PrintService } from './print/print.service';
import { TreeComponent } from './tree/tree.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TileComponent,
    TreeComponent,
    ],
  exports: [
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
