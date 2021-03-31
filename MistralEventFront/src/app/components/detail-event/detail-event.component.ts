import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { TokenService } from '../../services/token.service';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from 'src/app/models/evenement';
import { EvenementService } from 'src/app/services/evenement.service';
import { Location } from 'src/app/models/location';
import { LocationService } from '../../services/location.service';
import { GalleryLocationService } from '../../services/gallery-location.service';
import { EditedLocationService } from 'src/app/services/edited-location.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GalleryLocationComponent } from '../gallery-location/gallery-location.component';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss']
})
export class DetailEventComponent implements OnInit {

  evenement: Evenement;
  evenements: Evenement[];
  picturesIcon = faImages;
  listLocations: Location[] = [];
  location: Location;

  constructor(public account: AccountService, private token: TokenService, private evenementService: EvenementService, private router: Router, private route: ActivatedRoute,
    private locationService: LocationService,  public editedLocation: EditedLocationService, private galleryLocationService: GalleryLocationService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.evenementService.getEvenementById(+this.route.snapshot.paramMap.get('id')).subscribe((data: Evenement) =>  {
      this.evenement = data;
    })
    console.log(this.evenement)
  }
  showGallery(location: Location) {
    this.editedLocation.loadLocation(location);
    const modalRef = this.modalService.open(GalleryLocationComponent, { size: 'lg', backdrop: 'static' });
  }
}
