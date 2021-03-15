import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { EditProjectComponent } from './components/projects/edit-project/edit-project.component';
import { FormsModule } from '@angular/forms';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { CourseListComponent } from './components/courses/course-list/course-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AddProjectComponent,
    LoadingSpinnerComponent,
    EditProjectComponent,
    ProjectListComponent,
    CourseListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
