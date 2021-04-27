import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { User } from 'src/app/models/user';
import { Evenement } from '../../models/evenement';
import { EvenementService } from '../../services/evenement.service';
import { TokenService } from '../../services/token.service';
import { UsersService } from '../../services/users.service';
import { DetailEventComponent } from '../detail-event/detail-event.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditedEvenementService } from 'src/app/services/edited-evenement.service';
import { Router } from '@angular/router';


import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ImComingService } from 'src/app/services/im-coming.service';
import { take } from 'rxjs/operators';
import { ModalService } from '../utilities/modal/modal.service';
import { ToasterService } from '../utilities/toaster/toaster.service';

@Component({
  selector: 'app-upcomingEvents',
  templateUrl: './upcomingEvents.component.html',
  styleUrls: ['./upcomingEvents.component.scss'],
})
export class UpcomingEventsComponent implements OnInit {
  events: Evenement[] = [];
  plusIcon = faPlus;
  user: User;
  evenement: Evenement;
  constructor(
    private evenementService: EvenementService,
    private tokenservice: TokenService,
    private usersService: UsersService,
    private imComingService: ImComingService,
    private toasterService: ToasterService
    private editedEvenement: EditedEvenementService,
    private router: Router,
  ) { }
    private toasterService: ToasterService,
    private customModalService: ModalService
  ) {}

  ngOnInit() {
    forkJoin({
      user: this.usersService.getUser(this.tokenservice.getId()),
      events: this.evenementService.getEvenements(),
    }).pipe(take(1)).subscribe(({ user, events }) => {
      this.user = user;
      this.filterEventByUserGroup(user, events);
    });
  }

  filterEventByUserGroup(user: User, events: Evenement[]) {
    for (let userGroup of user.groups) {
      const result = events.filter((event: Evenement) => {
        if (
          event.groups.find(
            (eventGroups) => eventGroups.name === userGroup.name
          )
        ) {
          this.events.push(event);
        }
      });
    }
  }

  IAccept(evenement: Evenement) {
    const ref = this.customModalService.open("Etes vous sûr de venir ?");
    ref.result.then(res => {
      if (res) {
        this.imComingService.addUser(evenement, this.user);
        this.toasterService.showSucces("Vous participez à l'événément")
      } else {
        return
      }
    })
  }
  IRefuse(evenement: Evenement) {
    const ref = this.customModalService.open('Etes-vous sûr de ne pas venir ?', 'validerAnnuler', 'lg');
    ref.result.then(res =>{
      if (res) {
        this.imComingService.removeUser(evenement, this.user);
        this.toasterService.showError("Vous ne venez pas =(")
      } else {
        return
      }
    })
  }


  imComing(event: Evenement) {
    return this.imComingService.imComing(event, this.user);
  }

}
