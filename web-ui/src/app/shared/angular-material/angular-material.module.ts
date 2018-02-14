import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatTabsModule,
  MatButtonModule,
  MatInputModule
 } from '@angular/material';

@NgModule({
  exports: [
    MatTabsModule,
    MatButtonModule,
    MatInputModule
  ],
  imports: [
    CommonModule//,
    //BrowserAnimationsModule
  ],
  providers: [
  ],
  declarations: []
})
export class AngularMaterialModule { }
