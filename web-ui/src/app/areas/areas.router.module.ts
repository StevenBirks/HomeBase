import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const areasRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'}
]

const lazyAreasRoutes: Routes = [
  { path: 'music', loadChildren: './music/music.module#MusicModule'},
  { path: 'games', loadChildren: './games/games.module#GamesModule'},
  { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule'},
  { path: 'work', loadChildren: './work/work.module#WorkModule'}
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
