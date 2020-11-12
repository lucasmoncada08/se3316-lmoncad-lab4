import { Component, ViewEncapsulation } from '@angular/core';
import { EventSettingsModel, WorkWeekService} from '@syncfusion/ej2-angular-schedule';

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

  constructor() { }

  public keyConfigs = {
    select: "space",
    home: "ctrl+home",
    end: "ctrl+end"
  }

}
