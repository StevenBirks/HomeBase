import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouterModule } from './app.router.module';
import { AreasModule } from './areas/areas.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbsModule } from 'ng6-breadcrumbs';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { environment } from '../environments/environment';
import { API_BASE_URL } from '../generated/web.api';

export function getBaseUrl(): string {
  return environment.apiUrl;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
  ],
  imports: [
    BrowserModule,
    AreasModule,
    RouterModule,
    AppRouterModule,
    BrowserAnimationsModule,
    BreadcrumbsModule,
    AngularMaterialModule
  ],
  providers: [
     {provide: API_BASE_URL, useFactory: getBaseUrl }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
