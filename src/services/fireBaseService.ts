import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase } from 'angularfire2/database'

import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseServices {
   
   // integer values for three sorting types
   public orderByChild  : number = 1;
   public orderByKey    : number = 2;
   public orderByValue  : number = 3;

   // integer values for five filtering methods
   public limitToFirst  : number = 1
   public limitToLast   : number = 2
   public startAt       : number = 3
   public endAt         : number = 4
   public equalTo       : number = 5

   constructor(public fbAuth        : AngularFireAuth,
               public fbDatabase    : AngularFireDatabase){ }


   // get the nodes under the parent as json object
   readOnce(parent: string){

      return new Promise((resolve, reject) => {

         this.fbDatabase.database.ref(parent)
            .once("value")
            .then(function(snapshot) {
               resolve(snapshot);
            })
            .catch(function(error){
               reject('Something is wrong');
            });

      });
   }

 
   // write data to database
   writeInDatabase(parent: string, data: any){

      return new Promise((resolve, reject) => {
         this.fbDatabase.database.ref(parent)
            .set(data)
            .then(function (message){
               resolve("Data written successfully");
            })
            .catch(function(error) {
               reject("Data written failed");
            });
      });
   }


   // update a field or append a child to the parent
   updateField(data: any){

      return new Promise((resolve, reject) => {
         this.fbDatabase.database.ref()
            .update(data)
            .then(function(){
               resolve("Field updated successfully");
            })
            .catch(function(error){
               reject("Field updation failed");
            });
      });
   }

  
   // remove a field
   removeField(parent: string, child: string){

      return new Promise((resolve, reject) => {
         this.fbDatabase.database.ref(parent).child(child)
             .remove()
            .then(function(){
               resolve("Field removed successfully");
            })
            .catch(function(){
               reject("Field removal failed");
            });
      });
   }


   // orderBy Method
   orderData(method: number, parent: string, child: string = null){

      return new Promise((resolve, reject) => {

         if (method == this.orderByChild){
            this.fbDatabase.database.ref(parent)
                .orderByChild(child)
                .once("value")
                .then((snapshop) => {
                   resolve(snapshop);
                })
                .catch((error) => {
                   reject(error);
                });
         }

         else if (method == this.orderByKey){
            this.fbDatabase.database.ref(parent)
                .orderByKey()
                .once("value")
                .then((snapshop) => {
                   resolve(snapshop);
                })
                .catch((error) => {
                   reject(error);
                });
         }

         else if (method == this.orderByValue){
            this.fbDatabase.database.ref(parent)
                .orderByValue()
                .once("value")
                .then((snapshop) => {
                   resolve(snapshop);
                })
                .catch((error) => {
                   reject(error);
                });
         }

      });
   }
 
   // filter the data 
   filterData(method: number,parent: string, limit: number=null, orderByMethod: number = null, orderByChild: string = null, equalToString: string=null){
      
      return new Promise((resolve, reject) => {
         if (method == this.limitToFirst){
            this.fbDatabase.database.ref(parent)
                  .limitToFirst(limit)
                  .once("value")
                  .then(function(snapshot){
                     resolve(snapshot.val());
                  })
                  .catch(function(error){
                     reject(error);
                  });
         } 
         else if(method == this.limitToLast){
            this.fbDatabase.database.ref(parent)
                  .limitToLast(limit)
                  .once("value")
                  .then(function(snapshot){
                     resolve(snapshot.val());
                  })
                  .catch(function(error){
                     reject(error);
                  });
         }
         else if(method == this.startAt){
            if (orderByMethod == null){
               reject("orderBy Method missing");
            }else{

               if (orderByMethod == this.orderByChild){
                  this.fbDatabase.database.ref(parent)
                        .orderByChild(orderByChild)
                        .startAt(limit)
                        .once("value")
                        .then(function(snapshot){
                           resolve(snapshot);
                        })
                        .catch(function(error){
                           reject(error);
                        });
               }
               else if(orderByMethod == this.orderByKey){
                  this.fbDatabase.database.ref(parent)
                        .orderByKey()
                        .startAt(limit)
                        .once("value")
                        .then(function(snapshot){
                           resolve(snapshot);
                        })
                        .catch(function(error){
                           reject(error);
                        });
               }
               else if(orderByMethod == this.orderByValue){
                  this.fbDatabase.database.ref(parent)
                        .orderByValue()
                        .startAt(limit)
                        .once("value")
                        .then(function(snapshot){
                           resolve(snapshot);
                        })
                        .catch(function(error){
                           reject(error);
                        });
               }
               
            }
         }
         else if(method == this.endAt){
            if (orderByMethod == null){
               reject("orderBy Method missing");
            }else{

               if (orderByMethod == this.orderByChild){
                  this.fbDatabase.database.ref(parent)
                        .orderByChild(orderByChild)
                        .endAt(limit)
                        .once("value")
                        .then(function(snapshot){
                           resolve(snapshot);
                        })
                        .catch(function(error){
                           reject(error);
                        });
               }
               else if(orderByMethod == this.orderByKey){
                  this.fbDatabase.database.ref(parent)
                        .orderByKey()
                        .endAt(limit)
                        .once("value")
                        .then(function(snapshot){
                           resolve(snapshot);
                        })
                        .catch(function(error){
                           reject(error);
                        });
               }
               else if(orderByMethod == this.orderByValue){
                  this.fbDatabase.database.ref(parent)
                        .orderByValue()
                        .endAt(limit)
                        .once("value")
                        .then(function(snapshot){
                           resolve(snapshot);
                        })
                        .catch(function(error){
                           reject(error);
                        });
               }
               
            }
         }
         else if(method == this.equalTo){
            if (orderByMethod == null){
               reject("orderBy Method missing");
            }else{

               if (orderByMethod == this.orderByChild){
                  this.fbDatabase.database.ref(parent)
                        .orderByChild(orderByChild)
                        .equalTo(equalToString)
                        .once("value")
                        .then(function(snapshot){
                           resolve(snapshot);
                        })
                        .catch(function(error){
                           reject(error);
                        });
               }
               else if(orderByMethod == this.orderByKey){
                  this.fbDatabase.database.ref(parent)
                        .orderByKey()
                        .equalTo(equalToString)
                        .once("value")
                        .then(function(snapshot){
                           resolve(snapshot);
                        })
                        .catch(function(error){
                           reject(error);
                        });
               }
               else if(orderByMethod == this.orderByValue){
                  this.fbDatabase.database.ref(parent)
                        .orderByValue()
                        .equalTo(equalToString)
                        .once("value")
                        .then(function(snapshot){
                           resolve(snapshot);
                        })
                        .catch(function(error){
                           reject(error);
                        });
               }
               
            }
         }

      });
      
   }
   // login with email and password
   login(username: string, password: string){
      
      return new Promise((resolve, reject) => {

         this.fbAuth.auth.signInWithEmailAndPassword(username, password)
               .then((response) => {
                  resolve(response);
               })
               .catch((error) => {
                  reject(error);
               });
      });
   }

   // sign up with username and password
   signUp(username: string, password: string){
      
      return new Promise((resolve, reject) => {

         this.fbAuth.auth.createUserWithEmailAndPassword(username, password)
               .then((response) => {
                  resolve(response);
               })
               .catch((error) => {
                  reject(error);
               });
      });
   }
   
}
