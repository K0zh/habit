import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {
  habit: any;
  key: any;

  constructor(public storage: Storage) {
    this.habit = {
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
    }

    this.storage.get("habitList").then((list) => {
      if(list === null) {
        //this.key = 1;
      } else {
        //this.key = (list.length + 1);
      }
      console.log(this.key);
      console.log(list);
    });
  }

  createHabit() {
    //this.storage.clear();
    //this.storage.set("habits."+this.key, this.habit);
    //console.log(this.habit);
  }

}
