import { Component, Input, OnInit } from '@angular/core';
import { Evenenement } from 'src/app/models/evenement';

@Component({
  selector: 'app-eventCard',
  templateUrl: './eventCard.component.html',
  styleUrls: ['./eventCard.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() evenement: Evenenement = {
    id: 0,
    name: '',
    date: new Date,
    description: '',
    type: ''
  };

  constructor() { }

  ngOnInit() {
  }

}
