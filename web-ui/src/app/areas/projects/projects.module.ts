import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { ProjectsComponent } from './projects.component';
import { ProjectsTilesService } from './projects.tiles.service';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AdventOfCodeComponent } from './advent-of-code/advent-of-code.component';
import { AdventOfCodeModule } from './advent-of-code/advent-of-code.module';
import { StorageLabellingComponent } from './storage-labelling/storage-labelling.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent, pathMatch: 'full' },
  { path: 'advent-of-code', component: AdventOfCodeComponent, data: { breadcrumb: 'AOC' } },
  { path: 'storage-labelling', component: StorageLabellingComponent,  data: { breadcrumb: 'Storage labels' } }
];

@NgModule({
  declarations: [
    ProjectsComponent,
    StorageLabellingComponent
    ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    SharedModule,
    AdventOfCodeModule,
    RouterModule.forChild(routes)
  ],
  exports: [
  ],
  providers: [
    ProjectsTilesService
  ]
})
export class ProjectsModule { }
