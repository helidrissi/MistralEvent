import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Evenement } from 'src/app/models/evenement';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from '../../services/token.service';
import { DetailEventComponent } from '../detail-event/detail-event.component';
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  calendarAltIcon = faCalendarAlt;
  plusIcon = faPlus;

  user: User;
  listEvents: Evenement[] = [];
  id: number;
  constructor( private router: Router, private tokenservice:TokenService, private usersService:UsersService, private modalService: NgbModal) { }

  ngOnInit(): void {

  this.usersService.getUser(this.tokenservice.getId()).subscribe(data => {
    this.user = data;
    this.listEvents = data.events;
  }); 
  }
  openDetailEvent() {
    const modalRef = this.modalService.open(DetailEventComponent, { size: 'lg', backdrop: true });
  }
}
