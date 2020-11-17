import { Component, ViewEncapsulation } from '@angular/core';
import { WorkWeekService} from '@syncfusion/ej2-angular-schedule';
import { COURSES } from './data';
import { HttpClient } from '@angular/common/http';
import * as angular from "angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  providers: [WorkWeekService],
})

export class AppComponent {
  title = 'Western Timetable';
  public selectedDate: Date = new Date(2021, 8, 6);

  courseCodesWSubjCodes: any;
  timetableEntry: any;
  timetableEntryWCourseComp: any;
  scheduleNames: any;
  schedule: any;

  courses = COURSES;
  readonly ROOT_URL = 'http://localhost:3000';

  course1Check = false;
  course2Check = false;
  course3Check = false;
  course4Check = false;
  course5Check = false;

  constructor(private http: HttpClient) { }

  public keyConfigs = {
    select: "space",
    home: "ctrl+home",
    end: "ctrl+end"
  }

  getSubjCodesAndDescrs() {
    const l = document.getElementById('subjCodeAndDescrList');
    l.classList.toggle('hidden');
  }

  getCourseCodesWSubjCode(subjCode) {
    this.courseCodesWSubjCodes = this.http.get(this.ROOT_URL + `/api/coursecodes/${subjCode}`);
  }

  getTimetableEntry(subjCode, courseCode) {
    this.timetableEntry = this.http.get(this.ROOT_URL + `/api/times/${subjCode}/${courseCode}`);
  }
  
  getTimetableEntryWComponent(subjCode, courseCode, courseComp) {
    this.timetableEntryWCourseComp = this.http.get(this.ROOT_URL + `/api/times/${subjCode}/${courseCode}/${courseComp}`);
  }

  createNewSchedule(newSchedInput) {
    this.scheduleNames = this.http.get(this.ROOT_URL + `/api/timetable/new/${newSchedInput}`);
  }

  submitModifySchedule(schedName ,course1SubC, course1CC, course2SubC, course2CC, course3SubC, course3CC, course4SubC, course4CC, course5SubC, course5CC) {
    const newCourses = {
      "subjects": [],
      "courseCodes": []
    }

    if (this.course1Check) {
        newCourses["subjects"] = newCourses["subjects"].concat(course1SubC);
        newCourses["courseCodes"] = newCourses["courseCodes"].concat(course1CC);
    }
    if (this.course2Check) {
      newCourses["subjects"] = newCourses["subjects"].concat(course2SubC);
      newCourses["courseCodes"] = newCourses["courseCodes"].concat(course2CC);
    }
    if (this.course3Check) {
      newCourses["subjects"] = newCourses["subjects"].concat(course3SubC);
      newCourses["courseCodes"] = newCourses["courseCodes"].concat(course3CC);
    }
    if (this.course4Check) {
      newCourses["subjects"] = newCourses["subjects"].concat(course4SubC);
      newCourses["courseCodes"] = newCourses["courseCodes"].concat(course4CC);
    }
    if (this.course5Check) {
      newCourses["subjects"] = newCourses["subjects"].concat(course5SubC);
      newCourses["courseCodes"] = newCourses["courseCodes"].concat(course5CC);
    }
    
    const data = {
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newCourses)
    }

    this.schedule = this.http.post(this.ROOT_URL + `/api/timetable/modify/${schedName}`, JSON.stringify(newCourses), data).subscribe(r=>{});
  
  }
  value = '';
  onShowSchedule(value: string) { this.value = value; }

}

 