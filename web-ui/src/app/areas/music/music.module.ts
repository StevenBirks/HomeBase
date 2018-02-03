import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianoComponent } from './piano/piano.component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { MusicComponent } from './music.component';
import { GuitarComponent } from './guitar/guitar.component';
import { MusicTilesService } from './music.tiles.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MusicComponent,
    PianoComponent,
    GuitarComponent
    ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    SharedModule
  ],
  providers: [
    MusicTilesService
  ]
})
export class MusicModule { }
