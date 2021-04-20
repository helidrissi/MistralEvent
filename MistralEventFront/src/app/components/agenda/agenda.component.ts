import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { Evenement } from 'src/app/models/evenement';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { ImComingService } from '../../services/im-coming.service';
import { TokenService } from '../../services/token.service';
import { DetailEventComponent } from '../detail-event/detail-event.component';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  calendarAltIcon = faCalendarAlt;
  plusIcon = faPlus;

  user: User;
  listEvents: Evenement[] = [];
  id: number;
  constructor(
    private tokenservice: TokenService,
    private usersService: UsersService,
    private modalService: NgbModal,
    private imComingService: ImComingService
  ) {}

  ngOnInit(): void {
    this.usersService.getUser(this.tokenservice.getId()).pipe(take(1)).subscribe((data) => {
      this.user = data;
      this.listEvents = data.events;
    });
  }
  openDetailEvent() {
    const modalRef = this.modalService.open(DetailEventComponent, {
      size: 'lg',
      backdrop: true,
    });
  }

  IRefuse(evenement: Evenement) {
    const index = this.listEvents.findIndex(row => row.id == evenement.id);
    if (index !== -1) {
      this.listEvents.splice(index, 1);
    }
    this.imComingService.removeUser(evenement, this.user);
  }
}
