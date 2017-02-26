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
    this.icons = [
      'fa-heart', 'fa-star', 'fa-refresh', 'fa-tree',
      'fa-user', 'fa-bicycle', 'fa-file-text', 'fa-soccer-ball-o',
      'fa-paint-brush', 'fa-music', 'fa-home', 'fa-gamepad',
      'fa-cutlery', 'fa-book', 'fa-calendar'
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
