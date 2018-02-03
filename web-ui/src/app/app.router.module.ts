import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }    
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)    
  ],
  declarations: []
})
export class AppRouterModule { }
