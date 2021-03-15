import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectStatus } from 'src/app/shared/enums/project-status.enum';
import { Course } from 'src/app/shared/models/course.model';
import { Project } from 'src/app/shared/models/project.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { ProjectService } from 'src/app/shared/services/project.service';
import { NavigationService } from 'src/app/shared/utils/navigation.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private projectId: number = 0;
  public projectStatusEnum: Array<string> = Object.keys(ProjectStatus).filter(key => isNaN(+key));
  public project!: Project;
  public projectForm!: NgForm;
  public courses: Course[] = [];
  public isLoading: boolean = true;

  constructor(
    private projectService: ProjectService,
    private courseService: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.projectId = params['id'];
    });
    this.init();
  }

  ngOnDestroy(): void {
    if(this.subscriptions.length > 0) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

  init(): void {
    this.initCourses();
  }

  initProject(): void {
    this.isLoading = true;
    this.subscriptions.push(this.projectService.getProjectById(this.projectId)
    .subscribe(
      res => {
        console.log(res);
        this.project = res;
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.isLoading = false;
      } 
    ));
  }

  initCourses(): void {
    this.isLoading = true;
    this.subscriptions.push(this.courseService.getCourses()
    .subscribe(
      res => {
        console.log(res);
        this.courses = res;
      }, err => {
        console.log(err);
      } 
    ));
    this.initProject();
  }

  updateProject(projectForm: NgForm): void {
    this.project = projectForm.value;
    console.log(this.project);
    this.subscriptions.push(this.projectService.updateProject(this.project)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/home']);
      }, err => {
        console.log(err);
        this.router.navigate(['/home']);
      }
    ));
  }  
}
