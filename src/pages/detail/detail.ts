import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, AlertController, LoadingController  } from 'ionic-angular';

import { ListPage } from '../list/list';
import { UpdatePage } from '../update/update';
import * as moment from 'moment';


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  detailItem: any;
  check: any;
  checklist: Array<{}> = [];
  list: Array<{}> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public loadingCtrl: LoadingController,

  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.detailItem = navParams.get('item');

    this.checklist = [];
    this.storage.get("checklist").then((checklist) => {
      this.checklist = checklist;
      console.log(this.checklist);
    }).catch(() => {});

    console.log(this.checklist);

    this.check = {
      key: 0,
      date: moment().format(),
      memo: ""
    };


  }

  deleteHabit() {
    let confirm = this.alertCtrl.create({
      title: '삭제하시겠습니까?',
      message: '삭제 시 복구하실 수 없습니다.',
      buttons: [{
        text: '취소',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: '삭제',
        handler: () => {
          let habitList = [];
          this.storage.get("habitList").then((list) => {
            habitList = list;
            let index = 0;
            for(let i = 0; i < list.length; i++) {
              if(list[i].key === this.detailItem.key) {
                index = i;
                break;
              }
            }

            habitList.splice(index, 1);

            const loading = this.loadingCtrl.create({
              content: '삭제 중...'
            });
            loading.present();

            this.storage.set("habitList", habitList).then(() => {
              loading.dismiss();
              this.navCtrl.setRoot(ListPage);
            }).catch(() => {
              loading.dismiss();
            });

          }).catch(() => {});
        }
      }]
    });
    confirm.present();
  }

  createCheck() {

    let prompt = this.alertCtrl.create({
      title: '체크하기',
      message: "간단한 메모를 입력하세요",
      inputs: [{
        name: 'memo',
        placeholder: '입력하지 않으셔도 됩니다.'
      }],
      buttons: [{
        text: '취소',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '확인',
        handler: data => {
          /*
          this.storage.get("checklist").then((list) => {
            if(list !== null) {
              this.check.key = (list.length + 1);
              this.list = list;
            }
          }).catch(() => {});

          console.log('Saved clicked');
          this.check.memo = data.memo;
          this.check.date = moment().format();
          this.list.push(this.check);

          const loading = this.loadingCtrl.create({
            content: '저장 중...'
          });
          loading.present();

          this.storage.set("checklist", this.list).then(() => {
            loading.dismiss();
          }).catch(() => {
            loading.dismiss();
          });
          */
        }
      }]
    });
    prompt.present();
  }

  updateTapped(event, item) {
    this.navCtrl.push(UpdatePage, {
      item: item
    });
  }

}
