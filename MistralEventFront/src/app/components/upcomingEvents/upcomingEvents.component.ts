import { Component, OnInit } from '@angular/core';
import { Evenement } from '../../models/evenement';
import { EvenementService } from '../../services/evenement.service';

@Component({
  selector: 'app-upcomingEvents',
  templateUrl: './upcomingEvents.component.html',
  styleUrls: ['./upcomingEvents.component.scss']
})
export class UpcomingEventsComponent implements OnInit {
  agenda: Evenement[] = [];

  constructor(private evenementService: EvenementService) { }


  ngOnInit() {
    this.evenementService.getEvenements().subscribe((res: Evenement[]) => {
      this.agenda = res;
    })
  }

}
