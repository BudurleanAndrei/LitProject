import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import './lit/calendar.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'LitProject';

  @ViewChild("myCalendar")
  myCalendar!: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    const calendarElement: HTMLElement = this.myCalendar.nativeElement;

    calendarElement.addEventListener('day-selected', (event: any) => {
      const selectedDate = event.detail;
      console.log('Selected date:', selectedDate);
    });
    calendarElement.addEventListener('days-selected', (event: any) => {
      console.log('Selected start date:', event.detail.startDate);
      console.log('Selected end date:', event.detail.endDate);
    });
  }
}
