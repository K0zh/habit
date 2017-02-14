import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DetailPage } from '../detail/detail';
import { CreatePage } from '../create/create';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  habits: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param

    this.icons = ['ts-barbie', 'ts-bopeep', 'ts-bullseye', 'ts-buzz', 'ts-hamm',
    'ts-jessie', 'ts-potatohead', 'ts-rex', 'ts-sarge', 'ts-slinky', 'ts-squeeze',
    'ts-woody'];

    this.habits = [];
    for(let i = 0; i < 12; i++) {
      this.habits.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
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
