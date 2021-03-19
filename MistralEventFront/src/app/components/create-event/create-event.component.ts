import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

 eventNameControl = new FormControl('', Validators.required)
 locationControl= new FormControl('', Validators.required)
 locationNameControl = new FormControl('', Validators.required)
 streetAddressControl = new FormControl('', Validators.required)
 cityControl = new FormControl('', Validators.required)
 datetimeControl = new FormControl([Validators.required])
 descriptionControl = new FormControl()
 now = new Date().toISOString().substring(0, 16)

 locations = [
    {id: "1", name: "Brasserie de Clermont", address: "78 Boulevard François Mitterand", city : "Clermont-Ferrand"},
    {id:"2", name: "Brasserie du Théâtre", address: "6 Rue Nestor Perret", city : "Clermont-Ferrand"}
  ]

  form: FormGroup = new FormGroup({
    eventName: this.eventNameControl,
    location: this.locationControl, 
    locationName: this.locationNameControl,
    streetAddress: this. streetAddressControl,
    city: this. cityControl,
    datetime: this.datetimeControl,
    description: this.descriptionControl
  });

  getLocationById(id: string){
     const location = this.locations.filter(location => location.id === id)[0]
     return location
  }

  onSubmit() {

    const eventName = this.eventNameControl.value
    const location = this.locationControl.value
    const locationName = this.locationNameControl.value
    const streetAddress = this. streetAddressControl.value
    const city = this. cityControl.value
    const datetime = this. datetimeControl.value

    if(this.locationControl.value === "new")
    {
      const locationMessage = "Lieu créé, " + locationName + ", " + streetAddress + ", " + city
      alert(locationMessage)
    }
   
    const eventMessage = "Evenement créé, " + 
      eventName + ", " + locationName + ", " + streetAddress + ", " + city + ", " + datetime
    alert(eventMessage)
  }

  disableLocationControls()
  {
   this.locationNameControl.disable()
     this. cityControl.disable()
     this. streetAddressControl.disable()
  }

  enableLocationControls()
  {
       this.locationNameControl.enable()
     this. cityControl.enable()
     this. streetAddressControl.enable()
  }

  
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  
  this.disableLocationControls()

    this.locationControl.valueChanges.subscribe(value => {
      if(this.locationControl.value === 'new')
      {
        this.enableLocationControls()
        this.locationNameControl.setValue('')
        this. streetAddressControl.setValue('')
        this. cityControl.setValue('Clermont-Ferrand')
        
      }
      else{
      const newLocation = this.getLocationById(this.locationControl.value)
      this.disableLocationControls()
      this.locationNameControl.setValue(newLocation.name)
      this. streetAddressControl.setValue(newLocation.address)
      this. cityControl.setValue(newLocation.city)
      }

    })
  }

}
