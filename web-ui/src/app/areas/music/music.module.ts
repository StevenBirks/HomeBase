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
import { ViolinComponent } from './violin/violin.component';
import { ViolinScalesComponent } from './violin/violin-scales/violin-scales.component';

const routes: Routes = [
  { path: '', component: MusicComponent, pathMatch: 'full'},
  { path: 'piano', component: PianoComponent, data: { breadcrumb: 'Piano' } },
  { path: 'guitar', component: GuitarComponent, data: { breadcrumb: 'Guitar' }  },
  { path: 'drums', component: DrumsComponent, data: { breadcrumb: 'Drums' }  },
  { path: 'violin', component: ViolinComponent, data: { breadcrumb: 'Violin' }  },
];

@NgModule({
  declarations: [
    MusicComponent,
    PianoComponent,
    GuitarComponent,
    DrumsComponent,
    ViolinComponent,
    ViolinScalesComponent
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
