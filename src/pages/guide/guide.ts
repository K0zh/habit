import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ListPage } from '../list/list';


@Component({
  selector: 'page-guide',
  templateUrl: 'guide.html'
})
export class GuidePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {

  }

  continueTapped(event) {

    this.storage.set("guideChk", "1");
    this.navCtrl.setRoot(ListPage);

  }
}
