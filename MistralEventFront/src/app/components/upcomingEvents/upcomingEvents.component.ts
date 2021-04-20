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
import { ToasterService } from '../toaster/toaster.service';
import { take } from 'rxjs/operators';

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
    private modalService: NgbModal,
    private imComingService: ImComingService,
    private toasterService: ToasterService
    private editedEvenement: EditedEvenementService,
    private router: Router,
  ) { }

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
  openDetailEvent() {
    const modalRef = this.modalService.open(DetailEventComponent, {
      size: 'lg',
      backdrop: true,
    });
  }

  IAccept(evenement: Evenement) {
    this.imComingService.addUser(evenement, this.user);
    this.toasterService.showSucces("Vous participez à l'événément")
  }
  IRefuse(evenement: Evenement) {
    this.imComingService.removeUser(evenement, this.user);
    this.toasterService.showError("Vous ne venez pas =(")
  }


}
