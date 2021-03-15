import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/shared/models/course.model';
import { CourseService } from 'src/app/shared/services/course.service';
import { NavigationService } from 'src/app/shared/utils/navigation.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  public courses: Course[] = [];
  public isLoading: boolean = true;
  private subscriptions: Subscription[] = [];

  constructor(
    public navigationService: NavigationService,
    private courseService: CourseService
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
    this.isLoading = true;
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
    ));
  }
}
