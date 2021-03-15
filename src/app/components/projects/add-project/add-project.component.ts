import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/shared/models/course.model';
import { Project } from 'src/app/shared/models/project.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {
 
  private subscriptions: Subscription[] = [];
  public project!: Project;
  public projectForm!: NgForm;
  public courses: Course[] = [];
  public isLoading: boolean = true;
  public isCourseSelected: boolean = false;
  constructor(
    private projectService: ProjectService,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initCourses();
  }

  ngOnDestroy(): void {
    if(this.subscriptions.length > 0) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

  initCourses(): void {
    this.subscriptions.push(this.courseService.getCourses()
    .subscribe(
      res => {
        console.log(res);
        this.courses = res;
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.isLoading = false;
      } 
    )) 
  }

  insertProject(projectForm: NgForm): void {
    this.project = projectForm.value;
    this.subscriptions.push(this.projectService.createProject(this.project)
    .subscribe(
      res => {
        console.log(res);
        confirm('Project #' + res + ' created successfully!');
        this.router.navigate(['/home']);
      }, err => {
        console.log(err);
        confirm('An error ocurred while creating the project!');
        this.router.navigate(['/home']);
      }
    ))
  }  

  verifyCourseSelected(id: any): void {
    this.isCourseSelected = (id > 0);
  }
}
