import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ListPage } from '../list/list';


@Component({
  selector: 'page-guide',
  templateUrl: 'guide.html'
})
export class GuidePage {
  settings: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {
    storage.get("settings").then((val) => {
      if(val === null || val === undefined) {
        this.settings = {
          guide: false,
          notification: false
        };
      }
    });
  }

  continueTapped(event) {
    this.storage.set("settings", this.settings).then(() => {
      this.navCtrl.setRoot(ListPage);
    }).catch(() => {
      //TODO: 에러 Alert 작성
    });
  }
}
