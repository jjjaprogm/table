import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPerson} from "./app.interface";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(public http: HttpClient) {

  }

  getAnswer() {
    return this.http.get<IPerson[]>(`http://www.filltext.com/?rows=70&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
  }

}
