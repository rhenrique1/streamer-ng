import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly url = 'https://localhost:5001/api/course';

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get<Course[]>(this.url);
  }
}
