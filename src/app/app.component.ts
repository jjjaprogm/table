import {Component, OnInit} from '@angular/core';
import {IPerson} from "./app.interface";
import {AppService} from "./app.service";

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
export class AppComponent implements OnInit {
  findInput = '';
  personList: IPerson[] = [];
  refPersonList: IPerson[] = [];
  fullInfo: string = '';
  saveCon = this.refPersonList;
  pageNum = 0;
  stage: IStage = {
    id: false,
    userId: false,
    body: false,
    title: false,
    sortMy: col => {
      if( this.stage[col]){
        document.getElementById(col)!.className = 'normal';
      }else
      {
        document.getElementById(col)!.className = 'rotate';
      }
      this.refPersonList.sort((a, b) => {
        return this.stage[col] ? a[col] > b[col] ? 1 : -1 : a[col] > b[col] ? -1 : 1;
      });
      (this.stage[col] as boolean) = !this.stage[col];
    }
  }



  constructor(public answer: AppService) {
  }

  ngOnInit(): void {
    this.loadingTable();
    this.answer.getAnswer().subscribe(response => {
      this.personList = response;
      this.getNum();
      this.refPersonList = this.personList.slice(0, TABLE_NUM_ROW);
      this.saveCon = this.refPersonList;
      this.loadingTable();
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

  loadingTable(){
    this.refPersonList.length ? document.getElementById('loading')!.className = 'loading-off' : document.getElementById('loading')!.className = 'loading';
  }
  tableFilter(f: string) {
    if(f.length === 0){
      this.refPersonList = this.saveCon
    }else{
      let res : IPerson[] = this.refPersonList.filter(v => v.title == f);
      this.refPersonList = res;
    }
  }
}
