import { Component, OnInit } from '@angular/core';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  
  uploadIcon = faFileUpload;

  constructor() { }

  ngOnInit(): void {
  }

  changePassword() {
    
  }

  uploadAvatar() {
    
  }

}