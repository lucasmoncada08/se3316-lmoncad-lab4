import { Component, ViewEncapsulation } from '@angular/core';
import { EventSettingsModel, WorkWeekService} from '@syncfusion/ej2-angular-schedule';
import { COURSES } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  providers: [WorkWeekService],
})

export class AppComponent {
  title = 'Western Timetable';
  public selectedDate: Date = new Date(2021, 8, 6);
  // public eventSettings: EventSettingsModel = { dataSource: scheduleData };

  courses = COURSES;

  constructor() { }

  public keyConfigs = {
    select: "space",
    home: "ctrl+home",
    end: "ctrl+end"
  }

  getSubjCodesAndDescrs() {
    const l = document.getElementById('subjCodeAndDescrList');
    l.classList.toggle('hidden');
  }

  

  value = '';
  onShowSchedule(value: string) { this.value = value; }

}

 