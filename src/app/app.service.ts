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
    return this.http.get<IPerson[]>(`http://jsonplaceholder.typicode.com/posts`)
  }

}
