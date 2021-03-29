import { Component, OnInit } from '@angular/core';
import { faPlus, faImages, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// Modèles
import { Location } from 'src/app/models/location';

// Components
import { GalleryLocationComponent } from '../gallery-location/gallery-location.component';

// Services
import { LocationService } from '../../services/location.service';
import { GalleryLocationService } from '../../services/gallery-location.service';
import { EditedLocationService } from 'src/app/services/edited-location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  plusIcon = faPlus
  picturesIcon = faImages
  deleteIcon = faTrash
  editIcon = faPen
  listLocations: Location[] = [];
  location: Location;

  constructor(private locationService: LocationService, public editedLocation: EditedLocationService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe((data: Location[]) => {
      alert(JSON.stringify(data))
      this.listLocations = data;
    })
  }
  deleteLocation(location: Location): void {
    this.locationService.deleteLocationById(location).subscribe(then => {
      this.locationService.getAllLocations().subscribe((data: Location[]) => {
        this.listLocations = data;
      });
      this.router.navigate(['/home/locations']);
    });
  }

  showGallery(location: Location) {
    this.editedLocation.loadLocation(location);
    const modalRef = this.modalService.open(GalleryLocationComponent, { size: 'lg', backdrop: 'static' });
  }

  newLocation() {
    this.editedLocation.loadLocation(null);
    this.router.navigate(['/home/create-location']);
  }

  openLocation(location: Location) {
    this.editedLocation.loadLocation(location);
    this.router.navigate(['/home/create-location']);
  }
}
