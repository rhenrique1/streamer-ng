import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';

const routes: Routes = [
  { 
    path: 'home',
    component: HomeComponent 
  },
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: 'add-project',
    component: AddProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
