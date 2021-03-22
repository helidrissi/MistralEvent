import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-checkgroup',
  templateUrl: './checkgroup.component.html',
  styleUrls: ['./checkgroup.component.scss']
})
export class CheckGroupComponent implements OnInit {
  @Input() group: Group = {
    id: 0,
    name: ''
  };

  constructor(private account: AccountService) {
    
  }

  ngOnInit() {
  }
}