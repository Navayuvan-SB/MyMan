import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MymanHomePage } from './myman-home';

@NgModule({
  declarations: [
    MymanHomePage,
  ],
  imports: [
    IonicPageModule.forChild(MymanHomePage),
  ],
})
export class MymanHomePageModule {}
