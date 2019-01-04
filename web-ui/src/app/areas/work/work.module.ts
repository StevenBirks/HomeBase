import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkComponent } from './work.component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { DesignComponent } from './design/design.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialDesignComponent } from './material-design/material-design.component';
import { SharedModule } from '../../shared/shared.module';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
    { path: '', component: WorkComponent, pathMatch: 'full' }
  ];

@NgModule({
  declarations: [ 
    WorkComponent,
    DesignComponent,
    MaterialDesignComponent,
    RxjsComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class WorkModule { }
