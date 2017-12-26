import { NgModule } from '@angular/core';
import { PianoComponent } from './piano/piano.component';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { MusicComponent } from './music.component';
import { GuitarComponent } from './guitar/guitar.component';

@NgModule({
  declarations: [
    MusicComponent,
    PianoComponent,
    GuitarComponent
  ],
  imports: [
    AngularMaterialModule
  ]
})
export class MusicModule { }
