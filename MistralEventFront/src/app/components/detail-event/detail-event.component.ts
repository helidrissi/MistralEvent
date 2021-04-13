import { Component, Input, OnInit } from '@angular/core';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GalleryLocationComponent } from '../gallery-location/gallery-location.component';
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
@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss']
})
export class DetailEventComponent implements OnInit {
  @Input() evenement: Evenement;
  @Input() user: User;
  @Input() author: User;
  listUsers: User[] = [];
  evenements: Evenement[];

  picturesIcon = faImages;
  listLocations: Location[] = [];
  location: Location;
  evenementId: number;
  constructor(private ngbActiveModal: NgbActiveModal, private usersService: UsersService, public account: AccountService, private tokenService: TokenService, private evenementService: EvenementService, private router: Router, private route: ActivatedRoute,
    private locationService: LocationService, public editedLocation: EditedLocationService, private galleryLocationService: GalleryLocationService, private modalService: NgbModal) { }

  ngOnInit(): void {
      console.log( this.evenement)
  }
  showGallery(location: Location) {

    this.editedLocation.loadLocation(location);
    this.router.navigate(['/home/upcommingEvent'])
    const modalRef = this.modalService.open(GalleryLocationComponent, { size: 'lg', backdrop: true });
  }
}
