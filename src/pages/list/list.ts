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

    this.icons = ['ts-barbie', 'ts-bopeep', 'ts-bullseye', 'ts-buzz', 'ts-hamm',
    'ts-jessie', 'ts-potatohead', 'ts-rex', 'ts-sarge', 'ts-slinky', 'ts-squeeze',
    'ts-woody'];

    this.list = [];
    this.storage.get("habitList").then((list) => {
      if(list !== null) {
        for(let i = 0; i < list.length; i++) {
          list[i].icon = this.icons[Math.floor(Math.random() * this.icons.length)];
        }
        this.list = list;
      }
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
