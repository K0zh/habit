import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ListPage } from '../list/list';


@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {
  list: Array<{}> = [];
  habit: any;

  constructor(public navCtrl: NavController, public storage: Storage) {
    this.habit = {
      key: 0,
      icon: "",
      title: "",
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      times: "12:00",
      push: true
    };
  }

  createHabit() {
    this.storage.get("habitList").then((list) => {
      if(list !== null) {
        this.habit.key = (list.length + 1);
        this.list = list;
      }
      this.list.push(this.habit);
      this.storage.set("habitList", this.list).then(() => {
        this.navCtrl.push(ListPage);
      });
    }).catch(() => {});
    //this.storage.clear();
  }

}
