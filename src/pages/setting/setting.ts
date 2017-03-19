import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  settings: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController,
    public platform: Platform
  ) {

    this.settings = {
      guide: false,
      notification: false
    }
    storage.get('settings').then((val) => {
      if(val !== null) {
        this.settings = val;
      }
    }).catch(() => {
      //TODO: 에러 Alert 작성
    });
  }

  changeSetting() {
    this.storage.set("settings", this.settings).catch(() => {
      //TODO: 에러 Alert 작성
    });
  }

  reset() {
    let confirm = this.alertCtrl.create({
      title: '정말 초기화 하시겠습니까?',
      message: '기존 정보가 모두 삭제됩니다.\n초기화후 다시 실행해주세요.',
      buttons: [
        {
          text: '취소',
          handler: () => {

          }
        },
        {
          text: '초기화',
          handler: () => {
            this.storage.clear();
            this.exitApp()
          }
        }
      ]
    });
    confirm.present();
  }

  exitApp() {
    this.platform.exitApp();
  }
}
