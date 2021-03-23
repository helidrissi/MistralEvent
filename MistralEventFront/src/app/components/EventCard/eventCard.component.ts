import { Component, Input, OnInit } from '@angular/core';
import { Evenement } from 'src/app/models/evenement';

@Component({
  selector: 'app-eventCard',
  templateUrl: './eventCard.component.html',
  styleUrls: ['./eventCard.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() evenement: Evenement = {
    id: 0,
    name: '',
    date: new Date,
    description: '',
    type: ''
  };

  /**
 * @example
 * peut prendre en valeur upCommingCard ou agendaCard
 * permet de changer le bouton afficher en boutton je viens !  
 * processTarget('yo')
 *
 */
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
