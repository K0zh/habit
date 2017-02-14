import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    public storage: Storage
  ) {
    this.settings = {
      start: false,
      push: false
    }
    storage.get('settings').then((val) => {
      if(val !== null) {
        this.settings = val;
      }
    });
  }

  changeSetting() {
    this.storage.set("settings", this.settings);
  }

}
