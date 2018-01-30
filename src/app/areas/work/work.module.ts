import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkComponent } from './work.component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { DesignComponent } from './design/design.component';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  declarations: [WorkComponent, DesignComponent]
})
export class WorkModule { }
