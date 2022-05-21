import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private sideMenuOpened: boolean = false;
  @Output() sideMenuToggled = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideMenu() {
    this.sideMenuToggled.emit(!this.sideMenuOpened);
  }

}
