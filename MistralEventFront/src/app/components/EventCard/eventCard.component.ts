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
import { faImages, faMapMarked, faClock } from '@fortawesome/free-solid-svg-icons';
import { File } from 'src/app/models/file';

// Services
import { FilesService } from '../../services/files.service';
import { ImComingService } from '../../services/im-coming.service';
import { AccountService } from '../../services/account.service';

// Environnement
import { DEFAULT_IMG } from 'src/environments/environment';
import { User } from '../../models/user';

@Component({
  selector: 'app-eventCard',
  templateUrl: './eventCard.component.html',
  styleUrls: ['./eventCard.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() evenement: Evenement;

  @Input() user: User;

  /**
 * @example
 * peut prendre en valeur upCommingCard ou agendaCard
 * permet de changer le bouton afficher en boutton je viens !  
 * processTarget('yo')
 *
 */
  @Input() type: string;
  picturesIcon = faImages;
  clockIcon = faClock;
  mapMarkerIcon = faMapMarked;
  listLocations: Location[] = [];
  location: Location;
  imComing: boolean;
  base64: String = DEFAULT_IMG.image_location_default;

  constructor(private modalService: NgbModal, private locationService: LocationService,  public editedLocation: EditedLocationService, private galleryLocationService: GalleryLocationService, private filesService:FilesService, private imComingService: ImComingService, private accountService: AccountService) {
    
  }

  ngOnInit() {
    this.location = this.evenement.location;
    this.imComing = this.imComingService.imComing(this.evenement, this.user);
    if (this.location != null) {
      this.filesService.getFile("location" + this.location.id).subscribe((fileLoaded:File) => {
        if (fileLoaded != null && fileLoaded.picByte != null && fileLoaded.picByte.length > 0) {
          this.base64 = 'data:image/png;base64,' + fileLoaded.picByte;
        }
      }); 
    }
  }

  openDetailEvent() {
    const modalRef = this.modalService.open(DetailEventComponent);
    modalRef.componentInstance.evenement = this.evenement;
  }

  showGallery(location: Location) {
    if (location != null) {
      this.editedLocation.loadLocation(location);
      const modaleRef = this.modalService.open(GalleryLocationComponent, { size: 'lg', backdrop: true });
    }
  }

  iAccept() {
    this.imComing = true;
    this.imComingService.addUser(this.evenement, this.user);
  }

  iRefuse() {
    this.imComing = false;
    this.imComingService.removeUser(this.evenement, this.user);
  }
}
