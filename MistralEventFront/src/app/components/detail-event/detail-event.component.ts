import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { Evenement } from 'src/app/models/evenement';
import { Location } from 'src/app/models/location';
import { EditedLocationService } from 'src/app/services/edited-location.service';
import { EvenementService } from 'src/app/services/evenement.service';
import { AccountService } from '../../services/account.service';
import { GalleryLocationService } from '../../services/gallery-location.service';
import { LocationService } from '../../services/location.service';
import { TokenService } from '../../services/token.service';
import { GalleryLocationComponent } from '../gallery-location/gallery-location.component';

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

  constructor( public account: AccountService, private evenementService: EvenementService, private router: Router, private route: ActivatedRoute,
      public editedLocation: EditedLocationService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.evenementService.getEvenementById(+this.route.snapshot.paramMap.get('id')).pipe(take(1)).subscribe((data: Evenement) =>  {
      this.evenement = data;
    })
    console.log(this.evenement)
  }
  showGallery(location: Location) {

    this.editedLocation.loadLocation(location);
    this.router.navigate(['/home/upcommingEvent'])
    const modalRef = this.modalService.open(GalleryLocationComponent, { size: 'lg', backdrop: true });
  }
}
