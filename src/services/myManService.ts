import { FirebaseServices } from './fireBaseService';
import { Injectable } from '@angular/core';

@Injectable()
export class MyManService{

    photographer    : any;
    pack            : any;

    constructor(public fbService    : FirebaseServices){ 

        // fetch the pack details
        this.fbService.readOnce('packs')
                        .then((response) => {
                            this.pack = response;
                        })
                        .catch((error) => {

                        });
        
        // fetch the photographer details
        this.fbService.readOnce('photographers')
                        .then((response) => {
                            this.photographer = response;
                        })
                        .catch((error) => {

                        });

    }

    // update the Estimated amount of Booking
    updateETA(fromTime  : string, toTime    : string, pack  : string){

        return new Promise((resolve) => {
            console.log(fromTime);
            console.log(toTime);
            console.log(pack);

            let ETA = 0

            let cost = Number(pack.cost);

            let sTime = new Date(fromTime).getDate();
            let eTime = new Date(toTime).getDate();

            let difference = eTime - sTime;

            if(difference <= 0){

                ETA = 1 * cost * 100000;

            }else{

                ETA = (difference+1) * cost * 100000;

            }

            resolve(ETA);

        })        
    }

}