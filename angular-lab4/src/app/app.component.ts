import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ScheduleComponent, WorkWeekService} from '@syncfusion/ej2-angular-schedule';
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
  @ViewChild("scheduleObj") schedObj: ScheduleComponent;

  courseCodesWSubjCodes: any;
  timetableEntry: any;
  timetableEntryWCourseComp: any;
  schedule: any;
  scheduleNames: any;
  coursesInSched: any;
  courseNumsInSched: any;
  eventsInSched: any = 0;

  static schedules: any;

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

    this.http.post(this.ROOT_URL + `/api/timetable/modify/${schedName}`, JSON.stringify(newCourses), data).subscribe(r => AppComponent.schedules = r);
  }

  listCoursesInSchedule(schedName) {
    this.coursesInSched = this.http.get(this.ROOT_URL + `/api/timetable/view/${schedName}`);
  }

  listSchedulesAndCourses() {
    this.courseNumsInSched = this.http.get(this.ROOT_URL + '/api/timetable/listall');
  }

  deleteSchedule(schedName) {
    this.http.delete(this.ROOT_URL + `/api/timetable/delete/${schedName}`).subscribe(r=>{});
  }

  deleteAllScheds() {
    this.http.delete(this.ROOT_URL + '/api/timetable/deleteall').subscribe(r=>{});
  }

  async onShowSchedule(schedName: string) { 

    console.log(this.eventsInSched);
    for (var i=1; i<=this.eventsInSched+1; i++) {
      this.schedObj.deleteEvent(0);
    }
    
    var schedIndex = AppComponent.schedules["scheduleNames"].findIndex(item => item == schedName);
    var subjCodes = AppComponent.schedules["subjects"][schedIndex];
    var courseCodes = AppComponent.schedules["courseCodes"][schedIndex];
    var times = [];
    var dataLengths = []; 
    var oldLen = 0;

    var dayToNumDict = {
      "M": 6,
      "Tu": 7,
      "W": 8,
      "Th": 9,
      "F": 10
    };

    var timeToHourDict = {
      "8:30 AM": 8, "9:00 AM": 9,
      "9:30 AM": 9, "10:00 AM": 10,
      "10:30 AM": 10, "11:00 AM":11,
      "11:30 AM": 11, "12:00 PM": 12,
      "12:30 PM": 12, "1:00 PM": 13,
      "1:30 PM": 13, "2:00 PM": 14,
      "2:30 PM": 14, "3:00 PM": 15,
      "3:30 PM": 15, "4:00 PM": 16,
      "4:30 PM": 16, "5:00 PM": 17,
      "5:30 PM": 17, "6:00 PM": 18,
      "6:30 PM": 18, "7:00 PM": 19,
      "7:30 PM": 19, "8:00 PM": 20,
      "8:30 PM": 20, "9:00 PM": 21,
      "9:30 PM": 21, "10:00 PM": 22
    };

    var timeToMinDict = {
      "8:30 AM": 30, "9:00 AM": 0,
      "9:30 AM": 30, "10:00 AM": 0,
      "10:30 AM": 30, "11:00 AM":0,
      "11:30 AM": 30, "12:00 PM": 0,
      "12:30 PM": 30, "1:00 PM": 0,
      "1:30 PM": 30, "2:00 PM": 0,
      "2:30 PM": 30, "3:00 PM": 0,
      "3:30 PM": 30, "4:00 PM": 0,
      "4:30 PM": 30, "5:00 PM": 0,
      "5:30 PM": 30, "6:00 PM": 0,
      "6:30 PM": 30, "7:00 PM": 0,
      "7:30 PM": 30, "8:00 PM": 0,
      "8:30 PM": 30, "9:00 PM": 0,
      "9:30 PM": 30, "10:00 PM": 0
    };

    for (var i=0; i<subjCodes.length; i++) {
      await this.showScheduleHelper(subjCodes, courseCodes, i).then(res => {
        oldLen = times.length;
        times = times.concat(res);
        dataLengths = dataLengths.concat(times.length - oldLen);
    })};

    var timesIndex = 0;
    var startHour;
    var startMin;
    var endHour;
    var endMin;
    var days = [];
    var idCounter = 0;
    
    for (var i=0; i<dataLengths.length; i++) {
      startHour = timeToHourDict[`${times[timesIndex]}`];
      startMin = timeToMinDict[`${times[timesIndex]}`];
      endHour = timeToHourDict[`${times[timesIndex+1]}`];
      endMin = timeToMinDict[`${times[timesIndex+1]}`];
      days = [];
      for (var j=timesIndex+2; j<(timesIndex+dataLengths[i]-1); j++) {
          days[j-timesIndex-2] = dayToNumDict[times[j]];
      }
      for (var j=0; j<days.length; j++) {
        this.schedObj.addEvent([{
          id: idCounter,
          Subject: `${subjCodes[i]} - ${courseCodes[i]} (${times[timesIndex+dataLengths[i]-1]})`,
          StartTime: new Date(2021, 8, days[j], startHour, startMin),
          EndTime: new Date(2021, 8, days[j], endHour, endMin),
          isAllDay: false
        }])
        idCounter++;
      }
      timesIndex += dataLengths[i];
    }

    this.eventsInSched = idCounter-1;
  }

  async showScheduleHelper(subjCodes, courseCodes, index) {
      const result = await this.http.get(this.ROOT_URL + `/api/times/${subjCodes[index]}/${courseCodes[index]}`)
      .toPromise();
      return result;
  }
  
}

 