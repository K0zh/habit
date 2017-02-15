import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DetailPage } from '../detail/detail';
import { CreatePage } from '../create/create';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  list: Array<{}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage
  ) {
    // If we navigated to this page, we will have an item available as a nav param


    this.list = [];
    this.storage.get("habitList").then((list) => {
      this.list = list;
    }).catch(() => {});
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
