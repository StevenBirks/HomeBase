import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games.component';

const routes: Routes = [
  { path: '', component: GamesComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    GamesComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ]
})
export class GamesModule { }
