import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { ListPage } from '../pages/list/list';
import { CreatePage } from '../pages/create/create';
import { SettingPage } from '../pages/setting/setting';
import { GuidePage } from '../pages/guide/guide';
import { InformationPage } from '../pages/information/information';

import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: Component;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public storage: Storage
  ) {
    storage.get("settings").then((val) => {
      if(val === null || val.guide) {
        this.rootPage = GuidePage;
      } else {
        this.rootPage = ListPage;
      }
    });

    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: '버릇 등록', component: CreatePage, icon: 'md-add'},
      { title: '설정', component: SettingPage, icon: 'settings' },
      { title: '가이드 보기', component: GuidePage, icon: 'book' },
      { title: '버릇 정보', component: InformationPage, icon: 'information-circle' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page

    if(page.component.name === "ListPage") {
      this.nav.setRoot(page.component);
    } else {
      this.nav.push(page.component);
    }

  }
}
