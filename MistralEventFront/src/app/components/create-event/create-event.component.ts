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

  now = new Date()

  isChecked: boolean[] = [];

  allLocations: Location[] = [];

  allGroups: Group[] = [];

  author?: User;

  isEditing = false;

  isNewLocation = false;

  name = "Nicola"

  evenement: Evenement = {
    name: "",
    date: new (Date),
    comment: "",
    type: 'resto',
    location: {
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
    this.usersService.getUser(this.tokenService.getId()).subscribe(result =>
      this.author = result
    );

    if (this.isEditing) {
      this.evenement = this.editedEvenement.evenement;
    }

    this.groupsService.getGroups().subscribe(result => {
      this.allGroups = result
      this.allGroups.forEach(group => this.isChecked.push(
        this.evenement.groups.some(
          eventGroup => eventGroup.id === group.id)
          )
        );
    })
  }

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe()
    this.disableLocationControls()
  }


  onLocationChange(){
    if (this.locationControl.value === 'new') {
      this.evenement.location = {
        name: "",
        adress: "",
        city: "Clermont-Ferrand",
        images: []
      }
      this.isNewLocation = true;
    }
    else {
      this.evenement.location = this.getLocationById(this.locationControl.value)
      this.isNewLocation = false;
    }
  }

  onSubmit() {
    let location: Location;
    if (this.locationControl.value === "new") {
      this.locationService.addLocation(location).subscribe(result => {
        location = result
        /*         console.log(JSON.stringify(location)) */
        this.addEvenement()
      })
    }
    else {
      location = this.getLocationById(this.locationControl.value);
      this.addEvenement()
    }
  }

  toggleGroup(groupIndex: number, group: Group) {
    this.isChecked[groupIndex] = !this.isChecked[groupIndex]
    if(this.evenement.groups.some(g => g.id === group.id))
    {
      this.evenement.groups.push(group)
    }
    else
    {
      this.evenement.groups = this.evenement.groups.filter(g => g.id !== group.id)
    }
  }

  getLocationById(id: string) {
    const location = this.allLocations.filter(location => location.id === parseInt(id))[0]
    return location
  }

  addEvenement() {
    const groups: Group[] = this.allGroups.filter((group, index) => this.isChecked[index])
    console.log(JSON.stringify(this.author))

    if (this.editedEvenement.evenement == null) {
      this.evenementService.addEvenement(this.evenement).subscribe(result => {
        console.log(result)
        this.router.navigate(['/home/agenda'])
      })
    }
    else {
      this.evenementService.updateEvenementById(this.evenement).subscribe(result => {
        console.log(result)
        this.editedEvenement.loadEvenement(null)
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
