import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BookingTime} from '../domain/bookingTime';
import {BookingTimeRequest} from '../domain/bookingTime.request';


@Injectable()
export class BookingTimeService {
     FRAPI_URL = 'http://localhost:4000/timer';
    constructor(private http: Http,
        private httpc: HttpClient) { }

        getBookingTime() {
            return this.http.get(this.FRAPI_URL).map((response: Response) => {
                if (response.status === 200) {
                    return response;
                }
            }
            );
        }

        addBookingTime(bookingTimeRequest: BookingTimeRequest) {
            // tslint:disable-next-line:prefer-const

            return this.http.post(this.FRAPI_URL, bookingTimeRequest).map((response: Response) => {
                // tslint:disable-next-line:triple-equals
                if (response.json().code == 200) {
                    return response.json().data;
                }
            }
            );
        }
    }
