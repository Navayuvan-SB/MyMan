import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderBookedPage } from './order-booked';

@NgModule({
  declarations: [
    OrderBookedPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderBookedPage),
  ],
})
export class OrderBookedPageModule {}
