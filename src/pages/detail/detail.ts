import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, AlertController, LoadingController  } from 'ionic-angular';

import { ListPage } from '../list/list';
import { UpdatePage } from '../update/update';
import * as moment from 'moment';


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  detailItem: any;
  check: any;
  checklist: Array<{}> = [];
  checklist_detail: Array<any> = [];
  list: Array<{}> = [];

  checkflag: any;

  timeArray: Array<String> = [];
  today: Date;
  checkDate: Date;
  checkTime: any; //체크가능 시간


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public loadingCtrl: LoadingController,

  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.detailItem = navParams.get('item');

    this.checkDate = new Date();
    this.today = new Date();

    this.timeArray = this.detailItem.times.split(":");
    this.checkDate.setHours(+this.timeArray[0]);
    this.checkDate.setMinutes(+this.timeArray[1]);

    const checkHours = this.checkDate.getHours() * 60 * 60,
          checkMinutes = this.checkDate.getMinutes() * 60,
          todayHours = this.today.getHours() * 60 * 60,
          todayMinutes = this.today.getMinutes() * 60;

    this.checkTime = Math.abs((todayHours + todayMinutes) - (checkHours + checkMinutes));

    this.checklist = [];
    this.checklist_detail = [];

    this.storage.get("checklist").then((checklist) => {
      this.checklist = checklist;
      for(let i = 0; i < checklist.length; i++) {
        console.log(checklist[i].parent);
        if(checklist[i].parent === this.detailItem.key) {
          this.checklist_detail.push(checklist[i]);
        }
      }
    }).catch(() => {});

    this.check = {
      key: 1,
      parent: this.detailItem.key,
      date: moment().format(),
      memo: ""
    };

  }

  deleteHabit() {
    let confirm = this.alertCtrl.create({
      title: '삭제하시겠습니까?',
      message: '삭제 시 복구하실 수 없습니다.',
      buttons: [{
        text: '취소',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: '삭제',
        handler: () => {
          let habitList = [];
          this.storage.get("habitList").then((list) => {
            habitList = list;
            let index = 0;
            for(let i = 0; i < list.length; i++) {
              if(list[i].key === this.detailItem.key) {
                index = i;
                break;
              }
            }

            habitList.splice(index, 1);

            const loading = this.loadingCtrl.create({
              content: '삭제 중...'
            });
            loading.present();

            this.storage.set("habitList", habitList).then(() => {
              loading.dismiss();
              this.navCtrl.setRoot(ListPage);
            }).catch(() => {
              loading.dismiss();
            });

          }).catch(() => {});
        }
      }]
    });
    confirm.present();
  }

  createCheck() {

    let prompt = this.alertCtrl.create({
      title: '체크하기',
      message: "간단한 메모를 입력하세요",
      inputs: [{
        name: 'memo',
        placeholder: '입력하지 않으셔도 됩니다.'
      }],
      buttons: [{
        text: '취소',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '확인',
        handler: data => {
          //체크리스트 저장
          console.log('Saved clicked');

          if(this.checkTime < 600) {
            this.storage.get("checklist").then((checklist) => {
              const loading = this.loadingCtrl.create({
                content: '저장 중...'
              });
              loading.present();

              if(checklist !== null) {

                this.checklist = checklist;
                this.checklist_detail = [];
                for(let i = 0; i < checklist.length; i++) {
                  console.log(checklist[i].parent);
                  if(checklist[i].parent === this.detailItem.key) {
                    this.checklist_detail.push(checklist[i]);
                  }
                }

                this.check.key = (this.checklist_detail.length) + 1;
                this.list = checklist;

                if(this.checklist_detail.length > 0) {
                const duplicateCheck = new Date(this.checklist_detail[this.checklist_detail.length - 1].date);
                  this.checkflag = Math.abs(duplicateCheck.getTime() - this.today.getTime())
                }

              } else {
                this.checkflag = 600001; //첫번째 체크시 무조건 등록
              }

              this.check.parent = this.detailItem.key;
              this.check.memo = data.memo;
              this.check.date = moment().format();

              console.log(this.checkflag)
              if(this.checkflag < 1) { // 마지막 체크가 10분 이하일 경우
                let alert = this.alertCtrl.create({
                  title: '알림',
                  subTitle: '이미 체크했다',
                  buttons: ['확인']
                });
                alert.present();
                loading.dismiss();

              } else {
                this.list.push(this.check);

                this.storage.set("checklist", this.list).then(() => { // checklist에 저장
                  loading.dismiss();
                  this.checklist = this.list;
                  this.checklist_detail.push(this.check);
                  this.checklist_detail = this.checklist_detail;

                }).catch(() => {
                  loading.dismiss();
                });
              }
            }).catch(() => {});
          } else {
            console.log("체크시간 확인해라");
            let alert = this.alertCtrl.create({
              title: '알림',
              subTitle: '체크시간 확인해라',
              buttons: ['확인']
            });
            alert.present();
          }

        }
      }]
    });
    prompt.present();
  }

  updateTapped(event, item) {
    this.navCtrl.push(UpdatePage, {
      item: item
    });
  }

}
