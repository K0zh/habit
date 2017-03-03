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
  checklistDetail: Array<{}> = [];
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
    this.checklistDetail = [];

    this.storage.get("checklist").then((checklist) => {
      this.checklist = checklist;
      for(let i = 0; i < checklist.length; i++) {
        console.log(checklist[i].parent);
        if(checklist[i].parent === this.detailItem.key) {
          this.checklistDetail.push(checklist[i]);
        }

      }
    }).catch(() => {});

    this.check = {
      key: 0,
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

                this.check.key = (checklist.length) + 1;
                this.list = checklist;

                const duplicateCheck = new Date(checklist[checklist.length - 1].date);
                //if(duplicateCheck.getTime())
                this.checkflag = Math.abs(duplicateCheck.getTime() - this.today.getTime())

              } else {
                this.checkflag = 0;
              }

              this.check.parent = this.detailItem.key;
              this.check.memo = data.memo;
              this.check.date = moment().format();

              console.log(this.checkflag)
              if(this.checkflag < 600000) {
                this.list.push(this.check);
              } else {
                let alert = this.alertCtrl.create({
                  title: '알림',
                  subTitle: '이미 체크했다',
                  buttons: ['확인']
                });
                alert.present();
              }

              this.storage.set("checklist", this.list).then(() => {
                loading.dismiss();
                this.checklist = this.list;
              }).catch(() => {
                loading.dismiss();
              });
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
