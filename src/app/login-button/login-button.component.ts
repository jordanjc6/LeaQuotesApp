import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'login-button',
  templateUrl: './login-button.component.html',
  styles: [
    `button {
      padding: 0.2em 0.5em;
      border-radius: 2em;
    }`
  ]
})
export class LoginButtonComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }

}
