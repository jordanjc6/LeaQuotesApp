import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styles: [
    `p { 
      margin: 0;
      padding: 0;
     }`
  ]
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
