import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotographyPage } from './photography';

@NgModule({
  declarations: [
    PhotographyPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotographyPage),
  ],
})
export class PhotographyPageModule {}
