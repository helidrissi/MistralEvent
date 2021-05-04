import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { EvenementService } from 'src/app/services/evenement.service';

import { Evenement } from 'src/app/models/evenement';
import { User } from 'src/app/models/user';

@Injectable({
    providedIn: 'root'
  })
  export class ImComingService {
    constructor( private evenementService: EvenementService ) { }

    imComing(event: Evenement, user: User): boolean {
      if (user != null) {
        if(event.users.some(row => row.id == user.id)){
          return true;
        } else{
          return false;
        }
      }
    }

    addUser(event: Evenement, user: User) {
        console.log("AddUser");
        console.log(JSON.stringify(user));
        event.users.push(user);
        console.log(JSON.stringify(event));
        this.evenementService.updateEvenementById(event).subscribe(result => {
            console.log(JSON.stringify(result))
          })
    }

    removeUser(event: Evenement, user: User) {
        console.log("RemoveUser");
        console.log(JSON.stringify(user));
        const index = event.users.findIndex(row => row.id == user.id);
        if (index !== -1) {
          event.users.splice(index, 1);
        }
        console.log(JSON.stringify(event));
        this.evenementService.updateEvenementById(event).subscribe(result => {
            console.log(JSON.stringify(result))
          })  
      }
  }