import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { GuidePage } from '../pages/guide/guide';
import { ListPage } from '../pages/list/list';
import { CreatePage } from '../pages/create/create';
import { DetailPage } from '../pages/detail/detail';
import { UpdatePage } from '../pages/update/update';
import { CategoryPage } from '../pages/category/category';
import { SettingPage } from '../pages/setting/setting';
import { InformationPage } from '../pages/information/information';


@NgModule({
  declarations: [
    MyApp,
    GuidePage,
    ListPage,
    CreatePage,
    DetailPage,
    UpdatePage,
    CategoryPage,
    SettingPage,
    InformationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GuidePage,
    ListPage,
    CreatePage,
    DetailPage,
    UpdatePage,
    CategoryPage,
    SettingPage,
    InformationPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage]
})
export class AppModule {}
