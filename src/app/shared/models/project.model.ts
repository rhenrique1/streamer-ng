import { ProjectStatus } from "../enums/project-status.enum";
import { Course } from "./course.model";

export interface Project {
    id: number;
    name: string;
    image: string;
    why: string;
    what: string;
    whatWillWeDo: string;
    projectStatus: ProjectStatus;
    course: Course;
    courseId: number;
}
