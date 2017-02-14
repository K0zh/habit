import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, AlertController  } from 'ionic-angular';


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  detailItem: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.detailItem = navParams.get('item');
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: '체크하기',
      message: "간단한 메모를 입력하세요",
      inputs: [
        {
          name: 'memo',
          placeholder: '입력하지 않으셔도 됩니다.'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
