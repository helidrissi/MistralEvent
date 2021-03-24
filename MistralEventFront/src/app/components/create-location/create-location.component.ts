import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EvenementService } from '../../services/evenement.service'
import { Location } from '../../models/location'
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})

export class CreateLocationComponent implements OnInit {
  name = new FormControl('', Validators.required)
  streetAddress = new FormControl('', Validators.required)
  city = new FormControl('Clermont-Ferrand', Validators.required)

  form: FormGroup = new FormGroup({
    name: this.name,
    streetAddress: this.streetAddress,
    city: this.city,
  });


  onSubmit() {
    const name = this.name.value
    const streetAddress = this.streetAddress.value
    const city = this.city.value
    const location: Location = {
      name: name,
      adress: streetAddress

    }
    this.locationService.addLocation(location).subscribe(result => alert(JSON.stringify(result)))
    this.locationService.getAllLocations().subscribe(result => alert(JSON.stringify(result)))

  }


  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
  }

}
