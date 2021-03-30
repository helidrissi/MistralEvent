import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { TokenService } from '../../services/token.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from 'src/app/models/evenement';
import { EvenementService } from 'src/app/services/evenement.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss']
})
export class DetailEventComponent implements OnInit {

  evenement: Evenement;
  evenements: Evenement[];
  constructor(public account: AccountService, private token: TokenService, private evenementService: EvenementService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.evenementService.getEvenementById(+this.route.snapshot.paramMap.get('id')).subscribe((data: Evenement) =>  {
      this.evenement = data;
    })
    console.log(this.evenement)
  }

}
