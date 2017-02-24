import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ListPage } from '../list/list';


@Component({
  selector: 'page-guide',
  templateUrl: 'guide.html'
})
export class GuidePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  continueTapped(event) {
    this.navCtrl.setRoot(ListPage);
  }
}
