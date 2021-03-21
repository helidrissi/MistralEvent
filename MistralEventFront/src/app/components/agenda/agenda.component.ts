import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Evenenement } from 'src/app/models/evenement';
import { EvenementService } from '../../services/evenement.service';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  calendarAltIcon = faCalendarAlt;
  plusIcon = faPlus;

  listEvents: Evenenement[] = [];

  constructor(private evenementService: EvenementService) { }

  ngOnInit(): void {
    this.evenementService.getEvenements().subscribe((data: Evenenement[]) => {
      this.listEvents = data;
    })
  }

}
