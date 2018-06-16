import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Pipe, PipeTransform } from '@angular/core';
import 'rxjs/add/observable/interval';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { BookingTime } from './domain/bookingTime';
import { BookingTimeRequest } from './domain/bookingTime.request';
import { BookingTimeService } from './service/bookingTime.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import {CalendarModule} from 'primeng/calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BookingTimeService]
})
export class AppComponent implements OnInit {
  constructor(private _timeservice: BookingTimeService, private http: Http) { }
  // tslint:disable-next-line:typedef-whitespace
  bookingTime: BookingTime = new BookingTime();
  // tslint:disable-next-line:no-trailing-whitespace
  // tslint:disable-next-line:typedef-whitespace
  bookingTimeRequest: BookingTimeRequest = new BookingTimeRequest();
  cols: any[];
  booktime_dialog = false;
  countDown = '00:00:00';
  startDate:  Date;
  endDate: Date;
  h1 = document.getElementsByTagName('h1');
  start = document.getElementById('start');
  stop = document.getElementById('stop');
  clear = document.getElementById('clear');
  seconds = 0; minutes = 0; hours = 0;
  t;
  selectedtime;
  // tslint:disable-next-line:one-line
  addTimer() {
    this.seconds++;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++;
      }
    }

    this.h1[0].textContent = (this.hours ? (this.hours > 9 ? this.hours : '0' + this.hours) : '00')
      + ':' + (this.minutes ? (this.minutes > 9 ? this.minutes : '0' + this.minutes) : '00') +
      ':' + (this.seconds > 9 ? this.seconds : '0' + this.seconds);
    this.selectedtime = this.h1[0].textContent;
  }

  timer() {
    this.t = setInterval(() => {
      this.addTimer();
    }, 1000);
  }

  startTimer() {
    this.bookingTimeRequest.startDate = new Date;
    this.timer();
  }

  stopTimer() {
    this.bookingTimeRequest.endDate = new Date;
    clearTimeout(this.t);
  }

  clearTimer() {
    this.h1[0].textContent = '00:00:00';
    this.seconds = 0; this.minutes = 0; this.hours = 0;
  }

  BookTimer() {
    this.booktime_dialog = true;
  }

  // tslint:disable-next-line:member-ordering
  myElement;

  ngOnInit() {
    this.addTimer();
    this.getTmerDetails();
    this.cols = [
      { field: 'Created_date', header: 'Created_date' },
      { field: 'time', header: 'time' },
      { field: 'Description', header: 'Description' },
      { field: 'startDate', header: 'startDate' },
      { field: 'endDate', header: 'endDate' }
    ];
  }
  // tslint:disable-next-line:member-ordering
  arrayTime: BookingTime[];

  getTmerDetails() {
    this._timeservice.getBookingTime().subscribe(
      (data: any) => {
        if (data._body) {
          this.arrayTime = JSON.parse(data._body);
        }
      });
  }

  booktime() {
    this.bookingTimeRequest.time = this.selectedtime;
    this._timeservice.addBookingTime(this.bookingTimeRequest).subscribe(
      (data: any) => {
        this.getTmerDetails();
        this.h1[0].textContent = '00:00:00';
        this.seconds = 0; this.minutes = 0; this.hours = 0;
        this.selectedtime = '';
        this.booktime_dialog = false;
      });
  }
}

