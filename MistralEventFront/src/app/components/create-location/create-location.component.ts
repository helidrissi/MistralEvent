import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {
  eventName = new FormControl('', Validators.required)
  streetAddress = new FormControl('', Validators.required)
  city = new FormControl('Clermont-Ferrand', Validators.required)
  submit = new FormControl("Valider")

  form: FormGroup = new FormGroup({
    eventName: this.eventName,
    streetAddress: this.streetAddress,
    city: this.city,
    submit: this.submit
  });


  onSubmit() {
    const eventName = this.eventName.value
    const streetAddress = this.streetAddress.value
    const city = this.city.value
    const message = "Evenement crée " + ", " +
      eventName + ", " + streetAddress + ", " + city
    alert(message)
  }

  onValueChange() {
    alert("change")
  }


  constructor() { }

  ngOnInit(): void {
    //this.submit.disable();
  }

}
