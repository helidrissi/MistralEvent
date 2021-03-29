import { Component, Input, OnInit } from '@angular/core';

// Modèle
import { File } from 'src/app/models/file';

// Services
import { EditedLocationService } from 'src/app/services/edited-location.service';

@Component({
  selector: 'app-picture-gallery-location',
  templateUrl: './picture-gallery-location.component.html',
  styleUrls: ['./picture-gallery-location.component.scss']
})

export class PictureGalleryLocationComponent implements OnInit {

  @Input() file: File = {
    id: 0,
    type: '',
    name: '',
    picByte: ''
  };
  
  base64: String;

  constructor(public editedLocation: EditedLocationService) {
    
  }

  ngOnInit(): void {
    this.base64 = "data:image/png;base64," + this.file.picByte;
  }
}