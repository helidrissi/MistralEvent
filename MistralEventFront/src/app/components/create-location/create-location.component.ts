import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Services
import { LocationService } from 'src/app/services/location.service';
import { UploadService } from 'src/app/services/upload.service';
import { EditedLocationService } from 'src/app/services/edited-location.service';

// Models
import { Location } from '../../models/location'

// Components
import { FileUploadComponent } from '../fileupload/fileupload.component';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})

export class CreateLocationComponent implements OnInit {

  saveIcon = faSave;
  cancelIcon = faTimes;

  name = new FormControl('', Validators.required)
  streetAddress = new FormControl('', Validators.required)
  city = new FormControl('Clermont-Ferrand', Validators.required)

  form: FormGroup = new FormGroup({
    name: this.name,
    streetAddress: this.streetAddress,
    city: this.city,
  });

  constructor(private locationService: LocationService, public editedLocation: EditedLocationService, public uploadService: UploadService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const location: Location = {
      name: this.name.value,
      adress: this.streetAddress.value,
      city: this.city.value
    }
    this.locationService.addLocation(location).subscribe(result => alert(JSON.stringify(result)))
    this.locationService.getAllLocations().subscribe(result => alert(JSON.stringify(result)))
  }

  openAvatarUpload() {
    this.uploadService.type_file = this.uploadService.TYPE_AVATAR;
    const modalRef = this.modalService.open(FileUploadComponent);
  }

}
