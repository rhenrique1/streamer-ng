import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/shared/models/project.model';
import { ProjectStatus } from 'src/app/shared/enums/project-status.enum';
import { ProjectService } from 'src/app/shared/services/project.service';
import { NavigationService } from 'src/app/shared/utils/navigation.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public isLoading: boolean = true; 
  public courseId: number = 0;
  public projects: Project[] = [];
  public projectStatusEnum: Array<string> = Object.keys(ProjectStatus).filter(key => isNaN(+key));

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    public navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.courseId = params['id'];
    });
    this.initProjects();
  }

  ngOnDestroy(): void {
    if(this.subscriptions.length > 0) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

  initProjects(): void {
    this.isLoading = true;
    this.subscriptions.push(this.projectService.getByCourse(this.courseId)
    .subscribe(
      res => {
        console.log(res);
        this.projects = res;
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.isLoading = false;
      } 
    ));
  }

  deleteProject(projectId: number, name: string): void {
    if(confirm('Are you sure you want to delete ' + name + '?')) {
      this.subscriptions.push(this.projectService.deleteProject(projectId)
      .subscribe(
        res => {
          console.log(res);
          this.initProjects();
        }, err => {
          console.log(err);
          this.initProjects();
        }
      ));
    }
  }
}
