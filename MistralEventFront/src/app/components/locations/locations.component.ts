import { Component, OnInit } from '@angular/core';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Location } from 'src/app/models/location';
import { LocationService } from '../../services/location.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  plusIcon = faPlus;
  trashIcon = faTrash;
  listLocations: Location[] = [];
  location: Location;

  constructor(private locationService: LocationService, private router: Router) { }

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe((data: Location[]) => {
      this.listLocations = data;
    })
  }
  deleteLocation(id): void {
    this.locationService.deleteLocationById(id).subscribe(then => {
      this.locationService.getAllLocations().subscribe((data: Location[]) => {
        this.listLocations = data;
      });
      this.router.navigate(['/home']);
    });
  }
}
