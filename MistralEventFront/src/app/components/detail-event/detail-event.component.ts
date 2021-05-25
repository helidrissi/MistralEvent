import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  faClock,
  faImages,
  faMapMarked,
  faGrin,
  faSadTear,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GalleryLocationComponent } from '../gallery-location/gallery-location.component';
import { take } from 'rxjs/operators';
// Modèles
import { Evenement } from 'src/app/models/evenement';
import { Location } from 'src/app/models/location';
import { User } from 'src/app/models/user';
// Services
import { GalleryLocationService } from '../../services/gallery-location.service';
import { EditedLocationService } from 'src/app/services/edited-location.service';
import { LocationService } from '../../services/location.service';
import { EvenementService } from 'src/app/services/evenement.service';
import { TokenService } from '../../services/token.service';
import { AccountService } from '../../services/account.service';
import { UsersService } from '../../services/users.service';
import { EditedEvenementService } from 'src/app/services/edited-evenement.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss'],
})
export class DetailEventComponent implements OnInit {
  @Input() evenement: Evenement;
  @Input() user: User;
  @Input() author: User;
  @Input() imComing: boolean;

  @Output() IRefuse = new EventEmitter<Evenement>();
  @Output() IAccept = new EventEmitter<Evenement>();

  listUsers: User[] = [];
  evenements: Evenement[];
  currentUser: User;
  userIsAuthor = false;

  grinIcon = faGrin;
  tearIcon = faSadTear;
  clockIcon = faClock;
  positionIcon = faMapMarked;
  picturesIcon = faImages;
  
  listLocations: Location[] = [];
  location: Location;
  evenementId: number;
  constructor(private ngbActiveModal: NgbActiveModal, private usersService: UsersService, public account: AccountService, private tokenService: TokenService, private evenementService: EvenementService, private router: Router, private route: ActivatedRoute,
    private locationService: LocationService, public editedLocation: EditedLocationService, private galleryLocationService: GalleryLocationService, private modalService: NgbModal, private editedEvenement: EditedEvenementService) {
    this.usersService.getUser(this.tokenService.getId()).subscribe(result => {
      this.currentUser = result
      console.log(this.evenement.author.id)
      this.userIsAuthor = (this.currentUser.id === this.evenement.author.id)
    }

    );
  }

  ngOnInit(): void {
    console.log(this.evenement)
  }
  
  showGallery(location: Location) {
    this.editedLocation.loadLocation(location);
    this.router.navigate(['/home/upcommingEvent']);
    const modalRef = this.modalService.open(GalleryLocationComponent, {
      size: 'lg',
      backdrop: true,
    });
  }

  async modify() {
    this.editedEvenement.loadEvenement(this.evenement)
    await this.router.navigate(['/home/create-event'])
    this.ngbActiveModal.close()
  }

  sendResponseEvent(bool: boolean) {
    if (bool) {
      this.IAccept.emit(this.evenement);
    } else {
      this.IRefuse.emit(this.evenement);
    }
  }
}
