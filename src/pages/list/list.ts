import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AdMob } from 'ionic-native';

import { DetailPage } from '../detail/detail';
import { CreatePage } from '../create/create';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  list: Array<{}> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {
    this.storage.get("habitList").then((list) => {
      if(list !== null) {
        this.list = list;
      }
    }).catch(() => {
      //TODO: 에러 Alert 작성
    });

    // AdMob.createBanner({
    //   adId: 'ca-app-pub-4139703854678189/7032626151',
    //   adSize: 'SMART_BANNER',
    //   isTesting: true
    // }).then(() => {
    //   AdMob.showBanner(8);
    // });
  }

  itemTapped(event, item) {
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }

  createTapped(event) {
    this.navCtrl.push(CreatePage);
  }
}
