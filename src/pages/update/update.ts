import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

import { ListPage } from '../list/list';
import { CategoryPage } from '../category/category';


@Component({
  selector: 'page-update',
  templateUrl: 'update.html'
})
export class UpdatePage {
  list: Array<{}> = [];
  habit: any;
  param_data: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
    this.param_data = navParams.get('item');

    this.habit = {
      key: 1,
      category: null,
      title: "",
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      week: "",
      times: moment().format("HH:mm"),
      times_LT: moment().format("LT"),
      push: true
    };

    this.storage.get("habitList").then((list) => {
      for(let i = 0; i < list.length; i++) {
        if(this.param_data.key === list[i].key) {
          this.habit = list[i];
          break;
        }
      }
    }).catch(() => {
      //TODO: 에러 Alert 작성
    });
  }

  updateHabit() {
    this.storage.get("habitList").then((list) => {
      if(list !== null) {
        this.list = list;
      }

      /** 요일 표기 */
      this.habit.week = "";
      if(this.habit.mon) { this.habit.week += "월 "; }
      if(this.habit.tue) { this.habit.week += "화 "; }
      if(this.habit.wed) { this.habit.week += "수 "; }
      if(this.habit.thu) { this.habit.week += "목 "; }
      if(this.habit.fri) { this.habit.week += "금 "; }
      if(this.habit.sat) { this.habit.week += "토 "; }
      if(this.habit.sun) { this.habit.week += "일 "; }

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
      this.habit.times_LT = moment(this.habit.times, "HH:mm").format("LT");

      /** 저장 */
      this.list[index] = this.habit;

      const loading = this.loadingCtrl.create({
        content: '저장 중...'
      });
      loading.present();

      this.storage.set("habitList", this.list).then((list) => {
        loading.dismiss();
        this.navCtrl.setRoot(ListPage, null, {animate:true});
      }).catch(() => {
        loading.dismiss();
        //TODO: 에러 Alert 작성
      });

    }).catch(() => {
      //TODO: 에러 Alert 작성
    });
  }

  openCategoryModal(category_en_name) {
    let modal = this.modalCtrl.create(CategoryPage, {category_en_name : category_en_name});
    modal.onDidDismiss(data => {
      if(data !== undefined && data !== null) {
        this.habit.category = data;
      }
    });
    modal.present();
  }

}
