import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EvenementService } from '../../services/evenement.service';
import { Evenement } from '../../models/evenement';
import { Location } from '../../models/location';
import { LocationService } from 'src/app/services/location.service';
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  eventNameControl = new FormControl('', Validators.required)
  locationControl = new FormControl('', Validators.required)
  locationNameControl = new FormControl('', Validators.required)
  streetAddressControl = new FormControl('', Validators.required)
  cityControl = new FormControl('', Validators.required)
  datetimeControl = new FormControl('', Validators.required)
  descriptionControl = new FormControl('', Validators.required)
  now = new Date().toISOString().substring(0, 16)

  locations: Location[] = []
  
  form: FormGroup = new FormGroup({
    eventName: this.eventNameControl,
    location: this.locationControl,
    locationName: this.locationNameControl,
    streetAddress: this.streetAddressControl,
    city: this.cityControl,
    datetime: this.datetimeControl,
    description: this.descriptionControl
  });

  constructor(private evenementService: EvenementService, private locationService: LocationService) {
    this.locationService.getAllLocations().subscribe(result => {this.locations = result, alert(result)})
    
  }

  ngOnInit(): void {
  
    this.disableLocationControls()
    this.locationControl.valueChanges.subscribe(value => {
      if (this.locationControl.value === 'new') {
        this.enableLocationControls()
        this.locationNameControl.setValue('')
        this.streetAddressControl.setValue('')
        this.cityControl.setValue('Clermont-Ferrand')
      }
      else {
        const location = this.getLocationById(this.locationControl.value)
        this.disableLocationControls()
        this.locationNameControl.setValue(location.name)
        this.streetAddressControl.setValue(location.adress)
        //this.cityControl.setValue(newLocation.city)
        this.cityControl.setValue('Clermont-Ferrand')
      }
    })
  }

  onSubmit() {
    let location: Location;
    if (this.locationControl.value === "new") {
      location = {
        name: this.locationNameControl.value,
        adress: this.streetAddressControl.value,
        city: this.cityControl.value
      }
      this.locationService.addLocation(location).subscribe(result => {
        location = result
        alert(JSON.stringify(location))
        this.addEvenement(location)
      })
    }
    else {
      location = this.getLocationById(this.locationControl.value);
      this.addEvenement(location)
    }
  }

  getLocationById(id: string) {
    const location = this.locations.filter(location => location.id === parseInt(id))[0]
    return location
  }

  addEvenement(location: Location) {
    let evenement: Evenement = {
      name: this.eventNameControl.value,
      date: new Date(this.datetimeControl.value + ":00"),
      description: this.descriptionControl.value,
      type: 'resto',
      location: location
    }
    this.evenementService.addEvenement(evenement).subscribe(result => alert(JSON.stringify(result)));
  }

  disableLocationControls() {
    this.locationNameControl.disable()
    this.cityControl.disable()
    this.streetAddressControl.disable()
  }

  enableLocationControls() {
    this.locationNameControl.enable()
    this.cityControl.enable()
    this.streetAddressControl.enable()
  }
}
