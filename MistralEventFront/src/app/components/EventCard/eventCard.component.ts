import { Component, Input, OnInit } from '@angular/core';
import { Evenement } from 'src/app/models/evenement';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailEventComponent } from '../detail-event/detail-event.component';
import { Group } from 'src/app/models/group';
import { Location } from 'src/app/models/location';
import { LocationService } from '../../services/location.service';
import { GalleryLocationService } from '../../services/gallery-location.service';
import { EditedLocationService } from 'src/app/services/edited-location.service';
import { GalleryLocationComponent } from '../gallery-location/gallery-location.component';
import { faImages } from '@fortawesome/free-solid-svg-icons';

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
  picturesIcon = faImages;
  listLocations: Location[] = [];
  location: Location;

  constructor(private modalService: NgbModal, private locationService: LocationService,  public editedLocation: EditedLocationService, private galleryLocationService: GalleryLocationService) { }

  ngOnInit() {
  }
  openDetailEvent() {
    const modalRef = this.modalService.open(DetailEventComponent);
  }
  showGallery(location: Location) {
    this.editedLocation.loadLocation(location);
    const modalRef = this.modalService.open(GalleryLocationComponent, { size: 'lg', backdrop: true });
  }
}
