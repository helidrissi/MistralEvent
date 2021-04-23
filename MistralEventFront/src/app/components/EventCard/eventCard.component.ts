import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faClock,
  faImages,
  faMapMarked
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { Evenement } from 'src/app/models/evenement';
import { File } from 'src/app/models/file';
import { Location } from 'src/app/models/location';
import { EditedLocationService } from 'src/app/services/edited-location.service';
// Environnement
import { DEFAULT_IMG } from 'src/environments/environment';
import { User } from '../../models/user';
// Services
import { FilesService } from '../../services/files.service';
import { DetailEventComponent } from '../detail-event/detail-event.component';
import { GalleryLocationComponent } from '../gallery-location/gallery-location.component';

@Component({
  selector: 'app-eventCard',
  templateUrl: './eventCard.component.html',
  styleUrls: ['./eventCard.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() evenement: Evenement;

  @Input() user: User;
  @Input() imComing: boolean;

  /**
   * @example
   * peut prendre en valeur upCommingCard ou agendaCard
   * permet de changer le bouton afficher en boutton je viens !
   * processTarget('yo')
   *
   */
  @Input() type: string;

  @Output() IRefuse = new EventEmitter<Evenement>();
  @Output() IAccept = new EventEmitter<Evenement>();

  picturesIcon = faImages;
  clockIcon = faClock;
  mapMarkerIcon = faMapMarked;
  listLocations: Location[] = [];
  location: Location;
  base64: String = DEFAULT_IMG.image_location_default;

  constructor(
    private modalService: NgbModal,
    public editedLocation: EditedLocationService,
    private filesService: FilesService,
  ) {}

  ngOnInit() {
    this.location = this.evenement.location;
    // this.imComing = this.imComingService.imComing(this.evenement, this.user);
    if (this.location != null) {
      this.filesService
        .getFile('location' + this.location.id)
        .pipe(take(1))
        .subscribe((fileLoaded: File) => {
          if (
            fileLoaded != null &&
            fileLoaded.picByte != null &&
            fileLoaded.picByte.length > 0
          ) {
            this.base64 = 'data:image/png;base64,' + fileLoaded.picByte;
          }
        });
    }
  }

  openDetailEvent() {
    const modalRef = this.modalService.open(DetailEventComponent, {
      windowClass : "modalEvent",
    });
    modalRef.componentInstance.evenement = this.evenement;
  }

  showGallery(location: Location) {
    if (location != null) {
      this.editedLocation.loadLocation(location);
      const modaleRef = this.modalService.open(GalleryLocationComponent, {
        size: 'lg',
        backdrop: true,
      });
    }
  }

  sendResponseEvent(bool: boolean) {
    if (bool) {
      this.IAccept.emit(this.evenement);
    } else {
      this.IRefuse.emit(this.evenement);
    }
  }
}
