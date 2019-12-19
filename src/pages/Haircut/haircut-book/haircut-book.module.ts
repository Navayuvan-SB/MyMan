import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HaircutBookPage } from './haircut-book';

@NgModule({
  declarations: [
    HaircutBookPage,
  ],
  imports: [
    IonicPageModule.forChild(HaircutBookPage),
  ],
})
export class HaircutBookPageModule {}
