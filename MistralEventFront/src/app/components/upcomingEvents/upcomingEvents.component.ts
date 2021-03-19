import { Component, OnInit } from '@angular/core';
import { Evenenement } from '../../models/evenement';
import { EvenementService } from '../../services/evenement.service';

@Component({
  selector: 'app-upcomingEvents',
  templateUrl: './upcomingEvents.component.html',
  styleUrls: ['./upcomingEvents.component.scss']
})
export class UpcomingEventsComponent implements OnInit {
  agenda: Evenenement[] = [];

  constructor(private evenementService: EvenementService) { }

  ngOnInit() {
    this.evenementService.getEvenements().subscribe((res: Evenenement[]) => {
      this.agenda = res;
    })
  }

}
