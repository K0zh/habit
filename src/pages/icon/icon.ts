import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-icon',
  templateUrl: 'icon.html'
})
export class IconPage {
  icons: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.icons = ['fa-heart', 'fa-heart-o', 'fa-medkit', 'fa-play', 'fa-file'
      , 'fa-repeat', 'fa-scissors', 'fa-table', 'fa-krw', 'fa-usd', 'fa-area-chart'
      , 'fa-gear', 'fa-refresh', 'fa-bicycle', 'fa-car', 'fa-plane', 'fa-subway', 'fa-train'
      , 'fa-user', 'fa-tree', 'fa-video-camera', 'fa-star', 'fa-soccer-ball-o', 'fa-shopping-bag'
      , 'fa-recycle', 'fa-quote-left', 'fa-photo', 'fa-phone', 'fa-paw', 'fa-paint-brush'
      , 'fa-music', 'fa-language', 'fa-image', 'fa-home', 'fa-gamepad', 'fa-flask', 'fa-male'
      , 'fa-female', 'fa-cutlery', 'fa-coffee', 'fa-book', 'fa-calculator', 'fa-calendar'
    ];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  selectIcon(icon) {
    let data = { 'icon': icon };
    this.viewCtrl.dismiss(data);
  }

}
