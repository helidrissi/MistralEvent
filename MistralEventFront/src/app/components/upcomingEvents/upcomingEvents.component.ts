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
  events: Evenement[];

  constructor(
    private evenementService: EvenementService,
    private tokenservice: TokenService,
    private usersService: UsersService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.evenementService.getEvenements().subscribe((data: Evenement[]) => {
      console.log(JSON.stringify(data))
      this.events = data;
    })
    forkJoin({
      user: this.usersService.getUser(this.tokenservice.getId()),
      events: this.evenementService.getEvenements(),
    }).subscribe(({ user, events }) => {
      this.filterEventByUserGroup(user, events);
    });
  }

  filterEventByUserGroup(user: User, events: Evenement[]) {
    let groupEvent: Evenement[];
    for (let userGroup of user.groups) {
      groupEvent = events.filter((event: Evenement) => {
        if (
          event.groups.find((eventGroup) => eventGroup.name === userGroup.name)
        ) {
          // groupEvent = [...groupEvent, event];
          if (groupEvent !== undefined) {
            groupEvent = groupEvent.concat(event);
          }
        }
        if (groupEvent !== undefined) {
          this.events = this.events.concat(groupEvent);
        }

        // this.agenda = [...this.agenda, ...groupEvent]
      });
    }
  }
  openDetailEvent() {
    const modalRef = this.modalService.open(DetailEventComponent, { size: 'lg', backdrop: true });
  }
}