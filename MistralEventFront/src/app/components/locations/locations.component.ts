import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Location } from 'src/app/models/location';
import { LocationService } from '../../services/location.service';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  plusIcon = faPlus
  listLocations: Location[] = [];

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe((data: Location[]) => {
      this.listLocations = data;
    })
  }

}
