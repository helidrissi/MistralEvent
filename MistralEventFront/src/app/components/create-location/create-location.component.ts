import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EvenementService } from '../../services/evenement.service'
import { Location } from '../../models/location'
import { LocationService } from 'src/app/services/location.service';
import {Router} from '@angular/router'

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

  constructor(private locationService: LocationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const location: Location = {
      name: this.name.value,
      adress: this.streetAddress.value,
      city: this.city.value
    }
    this.locationService.addLocation(location).subscribe(result => 
    {console.log(JSON.stringify(result))
    this.router.navigate(['home/locations'])}
    )
    
  }
}
