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
  MatCheckboxModule,
  MatTreeModule,
  MatIconModule,
  MatBadgeModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule
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
    MatCheckboxModule,
    MatTreeModule,
    MatIconModule,
    MatBadgeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  imports: [
    CommonModule
  ],
  providers: [
  ],
  declarations: []
})
export class AngularMaterialModule { }
