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
  personList: IPerson[] = [];
  refPersonList: IPerson[] = [];
  displayedColumns: string[] = ['ID', 'userID', 'title'];
  fullInfo: string = '';
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
    // todo переделать
    this.answer.getAnswer().subscribe(response => {
      this.personList = response;
      this.getNum();
      this.refPersonList = this.personList.slice(0, TABLE_NUM_ROW);
    })
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

  closeFun(){
    document.getElementById('reset')!.className = 'window';
  }

}
