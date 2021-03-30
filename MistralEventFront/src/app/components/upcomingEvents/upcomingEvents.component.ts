import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { User } from 'src/app/models/user';
import { Evenement } from '../../models/evenement';
import { EvenementService } from '../../services/evenement.service';
import { TokenService } from '../../services/token.service';
import { UsersService } from '../../services/users.service';
import { DetailEventComponent } from '../detail-event/detail-event.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upcomingEvents',
  templateUrl: './upcomingEvents.component.html',
  styleUrls: ['./upcomingEvents.component.scss'],
})
export class UpcomingEventsComponent implements OnInit {
  agenda: Evenement[] = [];

  constructor(
    private evenementService: EvenementService,
    private tokenservice: TokenService,
    private usersService: UsersService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    forkJoin({
      user: this.usersService.getUser(this.tokenservice.getId()),
      events: this.evenementService.getEvenements(),
    }).subscribe(async ({ user, events }) => {
      this.filterEventByUserGroup(user, events);
    });
  }

  filterEventByUserGroup(user: User, events: Evenement[]) {
    for (let userGroup of user.groups) {
      console.log('userGroup', userGroup);
      
      const result = events.filter((event: Evenement) => {
        console.log('userGroup.name', userGroup.name);
        console.log('event.name', event);  
        if (
          event.groups.find((eventGroups) => eventGroups.name === userGroup.name)
          ) {
          this.agenda.push(event);
        }
      });
    }
    alert(JSON.stringify( this.agenda));
  }
  openDetailEvent() {
    const modalRef = this.modalService.open(DetailEventComponent, { size: 'lg', backdrop: true });
  }
}
