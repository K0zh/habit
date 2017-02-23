import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import * as moment from 'moment';

import { IconPage } from '../icon/icon';

@Component({
  selector: 'page-update',
  templateUrl: 'update.html'
})
export class UpdatePage {
  list: Array<{}> = [];
  habit: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
    this.habit = navParams.get('item');
  }

  updateHabit() {
    this.storage.get("habitList").then((list) => {
      if(list !== null) {
        this.list = list;
      }

      /** 요일 표기 */
      this.habit.week = "";
      if(this.habit.mon === true) { this.habit.week += "월 "; }
      if(this.habit.tue === true) { this.habit.week += "화 "; }
      if(this.habit.wed === true) { this.habit.week += "수 "; }
      if(this.habit.thu === true) { this.habit.week += "목 "; }
      if(this.habit.fri === true) { this.habit.week += "금 "; }
      if(this.habit.sat === true) { this.habit.week += "토 "; }
      if(this.habit.sun === true) { this.habit.week += "일 "; }

      let week = this.habit.week.replace(/ /gi, '');
      if(week === "월화수목금토일") {
        this.habit.week = "매일";
      } else if(week === "월화수목금") {
        this.habit.week = "주중";
      } else if(week === "토일") {
        this.habit.week = "주말";
      } else if(week.length === 1) {
        this.habit.week = week + "요일마다";
      }

      let index = 0;
      for(let i = 0; i < list.length; i++) {
        if(list[i].key === this.habit.key) {
          index = i;
          break;
        }
      }

      /** 시간 표기 */
      this.habit.times_LT = moment(this.habit.times, "H:mm").format("LT");

      /** 저장 */
      this.list[index] = this.habit;

      const loading = this.loadingCtrl.create({
        content: '저장 중...'
      });
      loading.present();

      this.storage.set("habitList", this.list).then(() => {
        loading.dismiss();
        this.navCtrl.pop();
      }).catch(() => {
        loading.dismiss();
      });

    }).catch(() => {});
  }

  openModal() {
    let modal = this.modalCtrl.create(IconPage);
    modal.onDidDismiss(data => {
      if(data !== undefined) {
        this.habit.icon = data.icon;
      }
    });
    modal.present();
  }

}
