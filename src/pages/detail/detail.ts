import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { ListPage } from '../list/list';
import { UpdatePage } from '../update/update';


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  detailItem: any;  // 버릇 정보
  check: any; // 기록 정보

  checklist: Array<{}> = [];  // 기록 전체 목록 (조회변수)
  checklist_detail: Array<any> = [];  // 현재 버릇 기록 목록
  list: Array<{}> = []; // 기록 전체 목록 (저장변수)

  checkflag: any; // 종복 체크 확인 변수

  today: Date;  // 오늘 날짜
  checkTime: any; // 체크가능 시간


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public loadingCtrl: LoadingController
  ) {
    this.detailItem = navParams.get('item');

    this.today = new Date();
    const checkDate = new Date();

    const timeArray = this.detailItem.times.split(":");
    checkDate.setHours(Number(timeArray[0]));
    checkDate.setMinutes(Number(timeArray[1]));

    const checkHours = checkDate.getHours() * 60 * 60;
    const checkMinutes = checkDate.getMinutes() * 60;
    const todayHours = this.today.getHours() * 60 * 60;
    const todayMinutes = this.today.getMinutes() * 60;

    this.checkTime = Math.abs((todayHours + todayMinutes) - (checkHours + checkMinutes));

    this.checklist = [];
    this.checklist_detail = [];

    this.storage.get("checklist").then((checklist) => {
      this.checklist = checklist;
      for(let i = 0; i < checklist.length; i++) {
        if(checklist[i].parent_key === this.detailItem.key) {
          this.checklist_detail.push(checklist[i]);
        }
      }
    }).catch(() => {
      //TODO: 에러 Alert 작성
    });

    this.check = {
      key: 1,
      parent_key: this.detailItem.key,
      date: moment().format(),
      memo: ""
    };

  }

  deleteHabit() {
    let confirm = this.alertCtrl.create({
      title: '삭제하시겠습니까?',
      message: '삭제 시 복구할 수 없습니다.',
      buttons: [{
        text: '취소',
        handler: () => {}
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
              this.navCtrl.setRoot(ListPage, null, {animate: true});
            }).catch(() => {
              loading.dismiss();
              //TODO: 에러 Alert 작성
            });
          }).catch(() => {
            //TODO: 에러 Alert 작성
          });
        }
      }]
    });
    confirm.present();
  }

  createCheck() {
    let prompt = this.alertCtrl.create({
      title: '기록하기',
      message: "간단한 메모를 입력하세요",
      inputs: [{
        name: 'memo',
        placeholder: '입력하지 않으셔도 됩니다.'
      }],
      buttons: [{
        text: '취소',
        handler: data => {}
      },
      {
        text: '확인',
        handler: data => {
          const TEN_MINUTES = 600;
          //체크리스트 저장
          if(this.checkTime < TEN_MINUTES) {
            this.storage.get("checklist").then((checklist) => {
              const loading = this.loadingCtrl.create({
                content: '저장 중...'
              });
              loading.present();

              if(checklist !== null) {
                this.checklist = checklist;
                this.checklist_detail = [];

                for(let i = 0; i < checklist.length; i++) {
                  if(checklist[i].parent_key === this.detailItem.key) {
                    this.checklist_detail.push(checklist[i]);
                    break;
                  }
                }

                this.check.key = (this.checklist_detail.length) + 1;
                this.list = checklist;

                if(this.checklist_detail.length > 0) {
                  const duplicateCheck = new Date(this.checklist_detail[this.checklist_detail.length - 1].date);
                  this.checkflag = Math.abs(duplicateCheck.getTime() - this.today.getTime())
                }
              } else {
                this.checkflag = ((TEN_MINUTES * 100) + 1); //첫번째 체크시 무조건 등록
              }

              this.check.parent_key = this.detailItem.key;
              this.check.memo = data.memo;
              this.check.date = moment().format();

              if(this.checkflag < (TEN_MINUTES * 100)) { // 마지막 체크가 10분 이하일 경우
                let alert = this.alertCtrl.create({
                  subTitle: '오늘은 이미 기록했어요',
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
                }).catch(() => {
                  loading.dismiss();
                  //TODO: 에러 Alert 작성
                });
              }
            }).catch(() => {
              //TODO: 에러 Alert 작성
            });
          } else {
            let alert = this.alertCtrl.create({
              title: '알림',
              subTitle: '시간을 확인해주세요',
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
