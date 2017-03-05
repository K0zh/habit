import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  categorys: any;
  selectedRadio: string;
  category: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.categorys = [
      {
        en_name: 'excercise',
        ko_name: '운동',
        icon: 'fa-soccer-ball-o'
      },
      {
        en_name: 'study',
        ko_name: '공부',
        icon: 'fa-book'
      },
      {
        en_name: 'hobby',
        ko_name: '취미',
        icon: 'fa-music'
      },
      {
        en_name: 'game',
        ko_name: '게임',
        icon: 'fa-gamepad'
      },
      {
        en_name: 'etc',
        ko_name: '기타',
        icon: 'fa-star'
      }
    ];

    let category_en_name = navParams.get('category_en_name');
    if(category_en_name) {
      this.selectedRadio = category_en_name;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  selectCategory() {
    let data = null;
    for(let i = 0; i < this.categorys.length; i++) {
      if(this.selectedRadio == this.categorys[i].en_name) {
        data = this.categorys[i];
        break;
      }
    }
    if(data !== null) {
      this.viewCtrl.dismiss(data);
    }
  }

}
