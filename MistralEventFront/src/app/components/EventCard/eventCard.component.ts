import { Component, Input, OnInit } from '@angular/core';
import { Evenement } from 'src/app/models/evenement';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailEventComponent } from '../detail-event/detail-event.component';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-eventCard',
  templateUrl: './eventCard.component.html',
  styleUrls: ['./eventCard.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() evenement: Evenement;

  /**
 * @example
 * peut prendre en valeur upCommingCard ou agendaCard
 * permet de changer le bouton afficher en boutton je viens !  
 * processTarget('yo')
 *
 */
  @Input() type: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  openDetailEvent() {
    const modalRef = this.modalService.open(DetailEventComponent);
  }
}
