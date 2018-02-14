import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianoComponent } from './piano/piano.component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { MusicComponent } from './music.component';
import { GuitarComponent } from './guitar/guitar.component';
import { MusicTilesService } from './music.tiles.service';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { DrumsComponent } from './drums/drums.component';

const routes: Routes = [
  { path: '', component: MusicComponent, pathMatch: 'full' },
  { path: 'piano', component: PianoComponent },
  { path: 'guitar', component: GuitarComponent },
  { path: 'drums', component: DrumsComponent },
];

@NgModule({
  declarations: [
    MusicComponent,
    PianoComponent,
    GuitarComponent,
    DrumsComponent
    ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MusicTilesService
  ]
})
export class MusicModule { }
