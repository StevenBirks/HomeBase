import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouterModule } from './app.router.module';
import { SharedModule } from './shared/shared.module';
import { AreasModule } from './areas/areas.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ],
  imports: [
    BrowserModule,
    SharedModule,
    AreasModule,
    RouterModule,
    AppRouterModule,
    BrowserAnimationsModule
      ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
