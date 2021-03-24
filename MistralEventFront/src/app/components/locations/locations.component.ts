import { Component, OnInit } from '@angular/core';
import { faPlus, faImages } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Modèles
import { Location } from 'src/app/models/location';

// Components
import { GalleryLocationComponent } from '../gallery-location/gallery-location.component';

// Services
import { LocationService } from '../../services/location.service';
import { GalleryLocationService } from '../../services/gallery-location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  plusIcon = faPlus
  picturesIcon = faImages
  listLocations: Location[] = [];

  constructor(private locationService: LocationService, private galleryLocationService: GalleryLocationService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe((data: Location[]) => {
      this.listLocations = data;
    })
  }

  showGallery(location: Location) {
    this.galleryLocationService.location = location;
    const modalRef = this.modalService.open(GalleryLocationComponent, { size: 'lg', backdrop: 'static' });
  }
}
