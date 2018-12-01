import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', data: { breadcrumb: 'Home'} },
  { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home'}  },
  { path: '**', redirectTo: '', pathMatch: 'full', data: { breadcrumb: 'Home'} }    
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
    ],
  declarations: []
})
export class AppRouterModule { }
