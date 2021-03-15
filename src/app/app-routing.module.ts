import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { EditProjectComponent } from './components/projects/edit-project/edit-project.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';

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
  },
  { 
    path: 'edit-project/:id', 
    component: EditProjectComponent,
  },
  { 
    path: 'course-projects/:id', 
    component: ProjectListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
