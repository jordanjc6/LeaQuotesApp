import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'logout-button',
  templateUrl: './logout-button.component.html',
  styles: [
    `button {
      padding: 0.2em 0.5em;
      border-radius: 2em;
    }`
  ]
})
export class LogoutButtonComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) { }

  ngOnInit(): void {
  }

}
