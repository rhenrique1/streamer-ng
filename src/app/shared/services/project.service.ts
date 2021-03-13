import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly url = 'https://localhost:5001/api/project';

  constructor(private http: HttpClient) { }

  getProjectById(id: number) {
    return this.http.get<Project>(this.url + '/' + id);
  }

  getByCourse(courseId: number) {
    return this.http.get<Project[]>(this.url + '/course/' + courseId);
  }

  updateProject(project: Project) {
    return this.http.put<Project>(this.url, project);
  }

  deleteProject(id: number) {
    return this.http.delete<Project>(this.url + '/' + id); 
  }

  createProject(project: Project) {
    return this.http.post<Project>(this.url, project);
  }
}
