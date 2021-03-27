import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss']
})
export class DetailEventComponent implements OnInit {

  constructor(public account: AccountService, private token: TokenService) {
    
   }

  ngOnInit(): void {
  }

}
