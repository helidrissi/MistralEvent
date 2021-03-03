import { Component, OnInit } from '@angular/core';
import { faAt, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  
  atIcon = faAt;
  saveIcon = faSave;

  constructor() { }

  ngOnInit(): void {
  }

  changePassword() {
    
  }

  uploadAvatar() {
    
  }

}