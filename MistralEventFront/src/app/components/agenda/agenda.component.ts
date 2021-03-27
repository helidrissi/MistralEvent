import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Evenement } from 'src/app/models/evenement';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from '../../services/token.service';
import { DetailEventComponent } from '../detail-event/detail-event.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  calendarAltIcon = faCalendarAlt;
  plusIcon = faPlus;

  listEvents: Evenement[] = [];

  constructor(private tokenservice:TokenService, private usersService:UsersService, private modalService: NgbModal) { }

  ngOnInit(): void {
   this.usersService.getUser(this.tokenservice.getId()).subscribe(data => {
     this.listEvents = data.events;
   });
  }
  openDetailEvent() {
    const modalRef = this.modalService.open(DetailEventComponent);
  }
}
