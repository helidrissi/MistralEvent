import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { User } from 'src/app/models/user';
import { Evenement } from '../../models/evenement';
import { EvenementService } from '../../services/evenement.service';
import { TokenService } from '../../services/token.service';
import { UsersService } from '../../services/users.service';
import { DetailEventComponent } from '../detail-event/detail-event.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../services/account.service';
import { EditedEvenementService } from 'src/app/services/edited-evenement.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'


import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ImComingService } from 'src/app/services/im-coming.service';
import { take } from 'rxjs/operators';
import { ModalService } from '../utilities/modal/modal.service';
import { ToasterService } from '../utilities/toaster/toaster.service';

@Component({
  selector: 'app-upcomingEvents',
  templateUrl: './upcomingEvents.component.html',
  styleUrls: ['./upcomingEvents.component.scss'],
})
export class UpcomingEventsComponent implements OnInit {
  events: Evenement[] = [];
  plusIcon = faPlus;
  user: User;
  evenement: Evenement;
  constructor(
    private evenementService: EvenementService,
    private tokenservice: TokenService,
    private usersService: UsersService,
    private accountService: AccountService,
    private imComingService: ImComingService,
    private editedEvenement: EditedEvenementService,
    private router: Router,
    private toasterService: ToasterService,
    private customModalService: ModalService,
    public datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    if (this.accountService.user != null) {
      this.user = this.accountService.user;
      this.evenementService.getNextEvenements(false, this.accountService.user.userId).subscribe((res: Evenement[]) => {
        this.events = res;
      });
    } else {
      // On passe par là quand le code est rechargé suite à une modif dans le code dans Visual Studio, cas de figure propre au dév
      this.usersService.getUser(this.tokenservice.getId()).subscribe((userLoaded:User) => {
        this.user = userLoaded;
        this.accountService.refreshUser(userLoaded);
        this.evenementService.getNextEvenements(false, userLoaded.userId).subscribe((res: Evenement[]) => {
          this.events = res;
        });
      }); 
    }
  }

  IAccept(evenement: Evenement) {
    const ref = this.customModalService.open(evenement.name,"Etes vous sûr de venir le " + this.datepipe.transform(evenement.date, 'dd/MM/yyyy à H:mm') + " ?");
    ref.result.then(res => {
      if (res) {
        this.imComingService.addUser(evenement, this.user);
        this.toasterService.showSucces("Vous participez à l'événément")
      } else {
        return
      }
    })
  }
  IRefuse(evenement: Evenement) {
    const ref = this.customModalService.open(evenement.name, 'Etes-vous sûr de ne pas venir le ' + this.datepipe.transform(evenement.date, 'dd/MM/yyyy à H:mm') + ' ?');
    ref.result.then(res =>{
      if (res) {
        this.imComingService.removeUser(evenement, this.user);
        this.toasterService.showError("Vous ne venez pas =(")
      } else {
        return
      }
    })
  }
  
  imComing(event: Evenement) {
    return this.imComingService.imComing(event, this.user);
  }

}
