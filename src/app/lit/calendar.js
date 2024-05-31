import { LitElement, html, css } from 'lit';

class MyCalendar extends LitElement {
  static properties = {
    currentDate: { type: Date },
    selectionMode: { type: String },
    selectedStartDate: { type: Date },
    selectedEndDate: { type: Date },
  };

  constructor() {
    super();
    this.currentDate = new Date();
    this.selectionMode = 'single';
    this.selectedStartDate = null;
    this.selectedEndDate = null;
  }

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
    .calendar {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 10px;
      background-color: #f0f0f0;
      border-bottom: 1px solid #ccc;
    }
    .header button {
      padding: 5px 10px;
      font-size: 1em;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 3px;
    }
    .header button:hover {
      background-color: #0056b3;
    }
    .month-year {
      font-size: 1.2em;
      cursor: pointer;
      transition: color 0.3s ease;
    }
    .month-year:hover {
      color: #007bff; /* Change color on hover to indicate clickability */
    }
    .days {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
    .day, .day-name {
      width: calc(100% / 7);
      padding: 10px;
      box-sizing: border-box;
      text-align: center;
    }
    .day-name {
      font-weight: bold;
      background-color: #f9f9f9;
    }
    .day {
      border: 1px solid #f0f0f0;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .day:hover {
      background-color: #f0f0f0;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
  }

  selectYear() {
    const selectedYear = prompt('Enter a year:');
    if (selectedYear) {
      const year = parseInt(selectedYear, 10);
      if (!isNaN(year)) {
        console.log('Selected year:', year);
        this.currentDate = new Date(year, 0, 1);
      } else {
        alert('Invalid year. Please enter a valid year.');
      }
    }
  }

  renderDays() {
    const startOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const endOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(html`<div class="day"></div>`);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i);
      days.push(html`<div class="day" @click="${() => this.selectDay(date)}">${i}</div>`);
    }

    return days;
  }

  selectDay(date) {
    if (this.selectionMode === 'single') {
      this.currentDate = date;
      this.dispatchEvent(new CustomEvent('day-selected', { detail: date }));
      this.requestUpdate();
    } else if (this.selectionMode === 'range') {
      this.selectDateRange(date);
    }
  }

  selectDateRange(date) {
    if (!this.selectedStartDate) {
      this.selectedStartDate = date;
    } else if (!this.selectedEndDate) {
      if (date >= this.selectedStartDate) {
        this.selectedEndDate = date;
        this.dispatchEvent(new CustomEvent('days-selected', { detail: {
          startDate: this.selectedStartDate, endDate: this.selectedEndDate}
        }));
        this.selectedStartDate = null;
        this.selectedEndDate = null;
        this.requestUpdate();
      } else {
        alert('End date must be after start date. Please select a valid end date.');
      }
    }
  }

  render() {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return html`
      <div class="calendar">
        <div class="header">
          <button @click="${this.prevMonth}">&lt;</button>
          <div class="month-year" @click="${this.selectYear}">
            ${this.currentDate.toLocaleString('default', { month: 'long' })} ${this.currentDate.getFullYear()}
          </div>
          <button @click="${this.nextMonth}">&gt;</button>
        </div>
        <div class="days">
          ${dayNames.map(day => html`<div class="day-name">${day}</div>`)}
          ${this.renderDays()}
        </div>
      </div>
    `;
  }
}

customElements.define('my-calendar', MyCalendar);
