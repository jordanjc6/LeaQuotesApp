import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'authentication-button',
  templateUrl: './authentication-button.component.html',
  styles: [
  ]
})
export class AuthenticationButtonComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
