# MyCalendar Component

MyCalendar is a customizable calendar web component built with LitElement. It provides a simple interface for displaying and interacting with dates, supporting both single date selection and date range selection modes.

## Features

- **Date Selection**: Choose between selecting a single date or a date range.
- **Customizable**: Easily customize the appearance and behavior of the calendar component to fit your application's needs.
- **Interactive Design**: Designed for ease of use by using buttons to go between months and an additional input for fastforwarding to a certain year.
- **Event transmission**: Has two types of event that you can subsctibe to, "day-selected" for "single" and "days-selected" for "range" mode

## Public Properties

- **selectionMode**: Specifies the selection mode of the calendar. Possible values are "single" (default) for selecting a single date and "range" for selecting a date range.
- **currentDate**: The selected date in single selection mode and used to navigate back and forth by using the buttons.
- **selectedStartDate**: The selected start date when in range selection mode.
- **selectedEndDate**: The selected end date when in range selection mode.

## Methods

- **selectDate(date)**: Handles date selection based on the selection mode. If in "single" mode, sets the selected date as the start date. If in "range" mode, invokes the `selectDateRange` method to handle date range selection.
- **selectDateRange(date)**: Handles selection of a date range. If no start date is selected, sets the provided date as the start date. If a start date is selected but no end date is selected, sets the provided date as the end date if it comes after the start date. If both start and end dates are selected, resets the selection to start a new range.
- **prevMonth() and nextMonth()**: Changes the current date to the previous/next month

## Usage

1. Import the `my-calendar` component into your project.
2. Place the `<my-calendar>` tag in your HTML file.
3. Customize the component's appearance and behavior by setting public properties or handling events.

### Example:
1. Html sindle date mode (default variant)
```html single date mode (default variant)
<my-calendar></my-calendar>
<my-calendar selectionMode="single"></my-calendar>
```
2. Html date range mode
```html date range mode
<my-calendar selectionMode="range"></my-calendar>
```
3. Integration example with angular and subscribe method with single/range modes
```angular example to use events

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
```
