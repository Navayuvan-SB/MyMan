import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HaircutHomePage } from './haircut-home';

@NgModule({
  declarations: [
    HaircutHomePage,
  ],
  imports: [
    IonicPageModule.forChild(HaircutHomePage),
  ],
})
export class HaircutHomePageModule {}
