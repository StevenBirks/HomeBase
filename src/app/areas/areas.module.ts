import { NgModule } from '@angular/core';
import { AreasRouterModule } from './areas.router.module';
import { ProjectsComponent } from './projects/projects.component';
import { GamesComponent } from './games/games.component';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { MusicModule } from './music/music.module';
import { AdventOfCodeModule } from './projects/advent-of-code/advent-of-code.module';
import { SharedModule } from '../shared/shared.module';
import { WorkModule } from './work/work.module';

@NgModule({
  declarations: [
    ProjectsComponent,
    GamesComponent  ],
  imports: [
    MusicModule,
    AreasRouterModule,
    AngularMaterialModule,
    AdventOfCodeModule,
    SharedModule,
    WorkModule
  ],
  exports: [
    SharedModule
  ]
})
export class AreasModule { }
