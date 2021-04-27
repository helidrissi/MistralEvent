import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EvenementService } from '../../services/evenement.service';
import { Evenement } from '../../models/evenement';
import { Location } from '../../models/location';
import { Group } from '../../models/group';
import { User } from '../../models/user';
import { LocationService } from 'src/app/services/location.service';
import { GroupsService } from 'src/app/services/groups.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import { EditedEvenementService } from 'src/app/services/edited-evenement.service';


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

  descriptionControl = new FormControl('')

  now = this.formatDate(new Date())

  isChecked: boolean[] = [];

  isNewEvent = false;

  locations: Location[] = [];

  allGroups: Group[] = [];

  eventGroups: Group[] = [];

  author?: User;

  isEditing = false;

  form: FormGroup = new FormGroup({
    eventName: this.eventNameControl,
    location: this.locationControl,
    locationName: this.locationNameControl,
    streetAddress: this.streetAddressControl,
    city: this.cityControl,
    datetime: this.datetimeControl,
    description: this.descriptionControl
  });

  formatDate(date: Date) {
    return date.toISOString().substring(0, 16)
  }

  constructor(
    private evenementService: EvenementService,
    private locationService: LocationService,
    private groupsService: GroupsService,
    private usersService: UsersService,
    private tokenService: TokenService,
    private router: Router,
    private editedEvenement: EditedEvenementService) {
    this.locationService.getAllLocations().subscribe(result => this.locations = result)
    this.isEditing = this.editedEvenement.evenement != null

    this.usersService.getUser(this.tokenService.getId()).subscribe(result =>
      this.author = result
    );

    if (this.isEditing) {
      this.eventGroups = this.editedEvenement.evenement.groups;
    }

    this.groupsService.getGroups().subscribe(result => {
      this.allGroups = result
      this.allGroups.forEach(group => this.isChecked.push(this.eventGroups.some(eventGroup => eventGroup.id === group.id)));
    })
  }


  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe()


    this.disableLocationControls()

    if (this.isEditing) {
      const event = this.editedEvenement.evenement
      const location = event.location;
      this.eventNameControl.setValue(event.name);
      this.locationControl.setValue(location.id)
      this.locationNameControl.setValue(location.name)
      this.streetAddressControl.setValue(location.adress)
      this.cityControl.setValue(location.city)
      this.datetimeControl.setValue(event.date)
      this.descriptionControl.setValue(event.description)
    }

    this.locationControl.valueChanges.subscribe(value => {
      if (this.locationControl.value === 'new') {
        this.isNewEvent = true;
        this.enableLocationControls()
        this.locationNameControl.setValue('')
        this.streetAddressControl.setValue('')
        this.cityControl.setValue('Clermont-Ferrand')
      }
      else {
        this.isNewEvent = false;
        const location = this.getLocationById(this.locationControl.value)
        this.disableLocationControls()
        this.locationNameControl.setValue(location.name)
        this.streetAddressControl.setValue(location.adress)
        this.cityControl.setValue(location.city)

      }
    })
  }

  onSubmit() {
    console.log(JSON.stringify(this.author))
    let location: Location;
    if (this.locationControl.value === "new") {
      location = {
        name: this.locationNameControl.value,
        adress: this.streetAddressControl.value,
        city: this.cityControl.value,
        images: []
      }
      this.locationService.addLocation(location).subscribe(result => {
        location = result
        /*         console.log(JSON.stringify(location)) */
        this.addEvenement(location)

      })
    }
    else {
      location = this.getLocationById(this.locationControl.value);
      this.addEvenement(location)
    }
  }

  toggleGroup(groupIndex: number, group: Group) {
    this.isChecked[groupIndex] = !this.isChecked[groupIndex]
  }

  getLocationById(id: string) {
    const location = this.locations.filter(location => location.id === parseInt(id))[0]
    return location
  }

  addEvenement(location: Location) {
    const groups: Group[] = this.allGroups.filter((group, index) => this.isChecked[index])
    console.log(JSON.stringify(this.author))
    let evenement: Evenement = {
      name: this.eventNameControl.value,
      date: this.datetimeControl.value,
      description: this.descriptionControl.value,
      type: 'resto',
      location: location,
      groups: groups,
      author: this.author
    }
    if (this.editedEvenement.evenement == null) {
      this.evenementService.addEvenement(evenement).subscribe(result => {
        console.log(JSON.stringify(result))
        this.router.navigate(['/home/agenda'])
      })
    }
    else {
      evenement.id = this.editedEvenement.evenement.id;
      this.evenementService.updateEvenementById(evenement).subscribe(result => {
        console.log(JSON.stringify(result))
        this.editedEvenement.loadEvenement(null)
      })
      this.router.navigate(['/home/agenda'])
    }

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
