import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  faClock,
  faImages,
  faMapMarked,
  faGrin,
  faSadTear,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GalleryLocationComponent } from '../gallery-location/gallery-location.component';
import { take } from 'rxjs/operators';

// Environnement
import { DEFAULT_IMG } from 'src/environments/environment';

// Modèles
import { Evenement } from 'src/app/models/evenement';
import { Location } from 'src/app/models/location';
import { User } from 'src/app/models/user';
import { File } from 'src/app/models/file';

// Services
import { GalleryLocationService } from '../../services/gallery-location.service';
import { EditedLocationService } from 'src/app/services/edited-location.service';
import { LocationService } from '../../services/location.service';
import { EvenementService } from 'src/app/services/evenement.service';
import { TokenService } from '../../services/token.service';
import { AccountService } from '../../services/account.service';
import { UsersService } from '../../services/users.service';
import { EditedEvenementService } from 'src/app/services/edited-evenement.service';
import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss'],
})
export class DetailEventComponent implements OnInit {
  @Input() evenement: Evenement;
  @Input() user: User;
  @Input() author: User;
  @Input() imComing: boolean;
  @Input() type: string;
  @Output() IRefuse = new EventEmitter<Evenement>();
  @Output() IAccept = new EventEmitter<Evenement>();

  listUsers: User[] = [];
  evenements: Evenement[];
  currentUser: User;
  userIsAuthor = false;

  grinIcon = faGrin;
  tearIcon = faSadTear;
  clockIcon = faClock;
  positionIcon = faMapMarked;
  picturesIcon = faImages;
  
  listLocations: Location[] = [];
  location: Location;
  evenementId: number;
  base64: String = DEFAULT_IMG.image_location_default;
  authorBase64: String = DEFAULT_IMG.avatar_default;

  constructor(private ngbActiveModal: NgbActiveModal, 
              private usersService: UsersService, 
              public account: AccountService, 
              private tokenService: TokenService, 
              private evenementService: EvenementService, 
              private router: Router, 
              private route: ActivatedRoute,
              private locationService: LocationService, 
              public editedLocation: EditedLocationService, 
              private galleryLocationService: GalleryLocationService, 
              private modalService: NgbModal, 
              private editedEvenement: EditedEvenementService,
              private filesService: FilesService,) {
    this.usersService.getUser(this.tokenService.getId()).subscribe(result => {
      this.currentUser = result
      this.userIsAuthor = (this.currentUser.id === this.evenement.author.id)
    }

    );
  }

  ngOnInit(): void {
/*     this.locationService.getAllLocations().subscribe((data: Location[]) => {
            this.listLocations = data;
          }) */
    this.location = this.evenement.location;
    if (this.location != null) {
      this.filesService
        .getFile('location' + this.location.id)
        .pipe(take(1))
        .subscribe((fileLoaded: File) => {
          if (
            fileLoaded != null &&
            fileLoaded.picByte != null &&
            fileLoaded.picByte.length > 0
          ) {
            this.base64 = 'data:image/png;base64,' + fileLoaded.picByte;
          }
        });
    }

    this.filesService.getFile(this.evenement.author.userId).subscribe((fileLoaded:File) => {
      if (fileLoaded != null && fileLoaded.picByte != null && fileLoaded.picByte.length > 0) {
        this.authorBase64 = 'data:image/png;base64,' + fileLoaded.picByte;
      }
    });

    for (var i in this.evenement.users) {
      this.evenement.users[i].base64 = DEFAULT_IMG.avatar_default;
      let participant:User = this.evenement.users[i];
      this.filesService.getFile(participant.userId).subscribe((fileLoaded:File) => {
        if (fileLoaded != null && fileLoaded.picByte != null && fileLoaded.picByte.length > 0) {
          console.log(i);
          participant.base64 = 'data:image/png;base64,' + fileLoaded.picByte;
        }
      });
    }
  }
  
  showGallery(location: Location) {
    this.editedLocation.loadLocation(location);
    const modalRef = this.modalService.open(GalleryLocationComponent, { size: 'lg', backdrop: true });
  }

  async modify() {
    this.editedEvenement.loadEvenement(this.evenement)
    await this.router.navigate(['/home/create-event'])
    this.ngbActiveModal.close()
  }

  sendResponseEvent(bool: boolean) {
    if (bool) {
      this.IAccept.emit(this.evenement);
    } else {
      this.IRefuse.emit(this.evenement);
    }
  }
}
