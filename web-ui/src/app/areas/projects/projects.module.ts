import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { ProjectsComponent } from './projects.component';
import { ProjectsTilesService } from './projects.tiles.service';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AdventOfCodeComponent } from './advent-of-code/advent-of-code.component';
import { AdventOfCodeModule } from './advent-of-code/advent-of-code.module';

const routes: Routes = [
  { path: '', component: ProjectsComponent, pathMatch: 'full' },
  { path: 'advent-of-code', component: AdventOfCodeComponent }
];

@NgModule({
  declarations: [
    ProjectsComponent,
    //AdventOfCodeComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    SharedModule,
    AdventOfCodeModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    //AdventOfCodeComponent
  ],
  providers: [
    ProjectsTilesService
  ]
})
export class ProjectsModule { }
