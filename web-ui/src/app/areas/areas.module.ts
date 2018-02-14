import { NgModule } from '@angular/core';
import { AreasRouterModule } from './areas.router.module';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { MusicModule } from './music/music.module';
import { AdventOfCodeModule } from './projects/advent-of-code/advent-of-code.module';
import { SharedModule } from '../shared/shared.module';
import { WorkModule } from './work/work.module';

@NgModule({
  declarations: [  ],
  imports: [
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
