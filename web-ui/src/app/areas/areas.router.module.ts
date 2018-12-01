import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const areasRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'}
]

const lazyAreasRoutes: Routes = [
  { path: 'music', loadChildren: './music/music.module#MusicModule', data: { breadcrumb: 'Music' } },
  { path: 'games', loadChildren: './games/games.module#GamesModule', data: { breadcrumb: 'Games' } },
  { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule', data: { breadcrumb: 'Projects' } },
  { path: 'work', loadChildren: './work/work.module#WorkModule', data: { breadcrumb: 'Work' } }
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
