import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HaircutPopupPage } from './haircut-popup';

@NgModule({
  declarations: [
    HaircutPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(HaircutPopupPage),
  ],
})
export class HaircutPopupPageModule {}
