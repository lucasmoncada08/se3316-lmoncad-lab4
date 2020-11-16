import { Component, ViewEncapsulation } from '@angular/core';
import { WorkWeekService} from '@syncfusion/ej2-angular-schedule';
import { COURSES } from './data';
import { HttpClient } from '@angular/common/http';

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

  courses = COURSES;
  readonly ROOT_URL = 'http://localhost:3000';

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

  value = '';
  onShowSchedule(value: string) { this.value = value; }

}

 