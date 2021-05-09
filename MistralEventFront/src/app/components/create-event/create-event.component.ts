import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { EvenementService } from '../../services/evenement.service';
import { Evenement } from '../../models/evenement';
import { Location } from '../../models/location';
import { Group } from '../../models/group';
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

  newLocationId = "$new"
  eventNameControl = new FormControl('', Validators.required)

  locationControl = new FormControl('', Validators.required)

  locationNameControl = new FormControl('', Validators.required)

  streetAddressControl = new FormControl('', Validators.required)

  cityControl = new FormControl('', Validators.required)

  datetimeControl = new FormControl('', Validators.required)

  descriptionControl = new FormControl('')

  now = new Date()

  isChecked: boolean[] = [];

  allLocations: Location[] = [];

  allGroups: Group[] = [];

  isEditing = false;

  isNewLocation = false;



  evenement: Evenement = {
    name: "",
    date: new (Date),
    comment: "",
    type: 'resto',
    location: {
      id: 0,
      name: "",
      adress: "",
      city: "",
      images: []
    },
    groups: [],
  }

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
    this.locationService.getAllLocations().subscribe(result => this.allLocations = result)
    this.isEditing = this.editedEvenement.evenement != null

    if (this.isEditing) {
      this.evenement = this.editedEvenement.evenement;
    }
    this.usersService.getUser(this.tokenService.getId()).subscribe(result =>
      this.evenement.author = result
    );

    this.groupsService.getGroups().subscribe(result => {
      this.allGroups = result
      this.allGroups.forEach(g => this.isChecked.push(this.evenement.groups.some(eventGroup => eventGroup.id === g.id)
      )
      );
    })
  }

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe()
    if (this.isEditing) {
      this.locationControl.setValue(this.evenement.location.id)
    }
    this.disableLocationControls()
  }

  onSubmit() {
    if (this.locationControl.value === this.newLocationId) {
      console.log(this.evenement.location)
      this.locationService.addLocation(this.evenement.location).subscribe(result => {
        this.evenement.location = result
        console.log(JSON.stringify(this.evenement.location))
        this.addEvenement()
      })
    }
    else {
      this.addEvenement()
    }
  }

  onGroupValueChange(groupIndex: number, group: Group) {
    this.isChecked[groupIndex] = !this.isChecked[groupIndex]
    if (this.evenement.groups.some(g => g.id === group.id)) {
      this.evenement.groups = this.evenement.groups.filter(g => g.id !== group.id)
    }
    else {
      this.evenement.groups.push(group)
    }
    console.log(this.evenement.groups);
  }

  onLocationChange() {
    if (this.locationControl.value === this.newLocationId) {
      this.evenement.location = {
        name: "",
        adress: "",
        city: "Clermont-Ferrand",
        images: []
      }
      this.isNewLocation = true;
      this.enableLocationControls()
    }
    else {
      const location = this.getLocationById(this.locationControl.value)
      this.evenement.location = this.getLocationById(this.locationControl.value)
      this.isNewLocation = false;
      this.disableLocationControls()
    }
    console.log(this.evenement.location)
  }

  getLocationById(id: string) {
    const location = this.allLocations.filter(location => location.id === parseInt(id))[0]
    return location
  }

  addEvenement() {
    const groups: Group[] = this.allGroups.filter((group, index) => this.isChecked[index])
    if (this.isEditing) {
      this.evenementService.updateEvenementById(this.evenement).subscribe(result => {
        console.log(result)
        this.editedEvenement.loadEvenement(null)
        this.router.navigate(['/home/agenda'])
      })
    }
    else {
      this.evenementService.addEvenement(this.evenement).subscribe(result => {
        console.log(result)
        this.router.navigate(['/home/agenda'])
      })
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
