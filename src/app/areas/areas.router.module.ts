import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { GamesComponent } from './games/games.component';
import { MusicComponent } from './music/music.component';

const areasRoutes: Routes = [
  { path: 'projects', component: ProjectsComponent},
  { path: 'music', component: MusicComponent},
  { path: 'games', component: GamesComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(areasRoutes)    
  ],
  declarations: []
})
export class AreasRouterModule { }
