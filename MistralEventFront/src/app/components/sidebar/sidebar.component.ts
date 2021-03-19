import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faCalendar, faCog, faDoorOpen, faFilm, faGlassCheers, faMapSigns, faBug } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  calendarAltIcon = faCalendarAlt;
  glassCheersIcon = faGlassCheers;
  mapSignsIcon = faMapSigns;
  cogIcon = faCog;
  creditIcon = faBug;
  exitIcon = faDoorOpen;

  constructor() { }
  ngOnInit(): void {
  }

}
