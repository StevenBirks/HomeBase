import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkComponent } from './work/work.component';
import { ProjectsComponent } from './projects/projects.component';
import { GamesComponent } from './games/games.component';
import { MusicComponent } from './music/music.component';

const areasRoutes: Routes = [
  { path: 'work', component: WorkComponent}
]

const lazyAreasRoutes: Routes = [
  { path: 'music', loadChildren: './music/music.module#MusicModule'},
  { path: 'games', loadChildren: './games/games.module#GamesModule'},
  { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule'}
];

@NgModule({
  imports: [
    RouterModule.forChild(areasRoutes),
    RouterModule.forRoot(lazyAreasRoutes)   
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AreasRouterModule { }
