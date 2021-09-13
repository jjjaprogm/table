import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import {IPerson} from "./app.interface";
import {AppService} from "./app.service";
import {debounceTime, map} from "rxjs/operators";

const TABLE_NUM_ROW = 20

interface IStage {
  id: boolean,
  userId: boolean,
  title: boolean,
  body: boolean,
  sortMy: (col: keyof IStage) => void
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  findInput = '';
  personList: IPerson[] = [];
  refPersonList: IPerson[] = [];
  fullInfo = '';
  isLoaded = false;
  saveCon: IPerson[] = [];
  pageNum = 0;
  @ViewChild('input',{static:false, read: ElementRef}) elInputRef: any
  stage: IStage = {
    id: false,
    userId: false,
    body: false,
    title: false,
    sortMy: col => {
      if( this.stage[col]){
        document.getElementById(col)!.className = 'normal';
      } else {
        document.getElementById(col)!.className = 'rotate';
      }
      this.refPersonList.sort((a, b) => {
        return this.stage[col] ? a[col] > b[col] ? 1 : -1 : a[col] > b[col] ? -1 : 1;
      });
      (this.stage[col] as boolean) = !this.stage[col];
    }
  }



  constructor(public answer: AppService) {}

  ngOnInit(): void {
    this.isLoaded = true;
    this.answer.getAnswer().subscribe(response => {
      this.personList = response;
      this.getNum();
      this.saveCon = this.refPersonList = this.personList.slice(0, TABLE_NUM_ROW);
      this.isLoaded = false;
    }, error => {
      console.log('Ошибка получения данных с сервера', error);
    });
  }


 swapPage(isBack: boolean = false) {
   isBack ? this.pageNum -= TABLE_NUM_ROW :  this.pageNum += TABLE_NUM_ROW
   this.pageNum < 0 && (this.pageNum = 0)
   this.refPersonList = this.personList.slice(this.pageNum, this.pageNum + TABLE_NUM_ROW)
 }

 fullPersonInfo(row : IPerson){
  this.fullInfo = row.body;
   document.getElementById('reset')!.className = 'window-new';
 }

 getNum(){
    this.personList.forEach(function (v,i ){
      v.num = i;
    });
 }

  closeModalWindow(){
    document.getElementById('reset')!.className = 'window';
  }

  tableFilter(refEl: HTMLInputElement) {
    console.log(refEl)
      fromEvent(refEl, 'keyup')
        .pipe(
          map((e: any) => e.target.value),
            debounceTime(2000)
        )
        .subscribe((item: string) => {
          this.refPersonList = this.saveCon.filter(v => v.title.indexOf(item) !== -1);
        })
  }

  ngAfterViewInit(): void {
    this.tableFilter(this.elInputRef.nativeElement)
  }
}
