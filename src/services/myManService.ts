import { FirebaseServices } from './fireBaseService';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';

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
    updateETA(fromTime  : string, 
              toTime    : string, 
              pack      : any){

        return new Promise((resolve, reject) => {
            
            console.log({ fromTime, toTime, pack });

            let ETA = 0

            let cost = Number(pack.cost);

            let sTime = new Date(fromTime);
            let eTime = new Date(toTime);

            const utc1 = Date.UTC(sTime.getFullYear(), sTime.getMonth(), sTime.getDate());
            const utc2 = Date.UTC(eTime.getFullYear(), eTime.getMonth(), eTime.getDate());

            let difference = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));;

            
            if(difference < 0){
                ETA = 0;
                reject(ETA)

            }
            else if (difference == 0){

                ETA = 1 * cost;

            }
            else{

                ETA = (difference + 1) * cost;

            }

            resolve(ETA);

        })  
    }

}