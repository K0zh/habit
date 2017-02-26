import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { CreatePage } from '../pages/create/create';
import { DetailPage } from '../pages/detail/detail';
import { SettingPage } from '../pages/setting/setting';
import { GuidePage } from '../pages/guide/guide';
import { UpdatePage } from '../pages/update/update';
import { IconPage } from '../pages/icon/icon';
import { InformationPage } from '../pages/information/information';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    CreatePage,
    DetailPage,
    SettingPage,
    GuidePage,
    UpdatePage,
    IconPage,
    InformationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    CreatePage,
    DetailPage,
    SettingPage,
    GuidePage,
    UpdatePage,
    IconPage,
    InformationPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage]
})
export class AppModule {}
