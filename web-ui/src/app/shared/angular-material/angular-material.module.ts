import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  MatTabsModule,
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
 } from '@angular/material';

@NgModule({
  exports: [
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  imports: [
    CommonModule
  ],
  providers: [
  ],
  declarations: []
})
export class AngularMaterialModule { }
