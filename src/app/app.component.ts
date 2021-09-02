import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'LeaQuotesApp';

  sidenav_opened: boolean = true;
  sidenav_mode: any = "side";

  ngOnInit() {
    let mediaQuery = window.matchMedia("(max-width: 428px)");
    if(mediaQuery.matches) {
      this.setMobileNav();
    } else {
      document.getElementById("sidenav")!.style.width = "15%";
    }
  }

  setMobileNav() {
    this.sidenav_opened = false;
    this.sidenav_mode = "over";
    document.getElementById("sidenav")!.style.width = "50%";
    document.getElementById("menu-button")!.style.display = "flex";
  }
}
