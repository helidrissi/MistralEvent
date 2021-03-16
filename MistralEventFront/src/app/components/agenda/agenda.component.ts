import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faCalendar, faCog, faDoorOpen, faFilm, faGlassCheers, faMapSigns, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  calendarAltIcon = faCalendarAlt;
  plusIcon = faPlusCircle
  constructor() { }

  ngOnInit(): void {
  }

}
