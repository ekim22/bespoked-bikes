import {Component, ViewChild} from '@angular/core';
import {HeaderComponent} from "./core/header/header.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(HeaderComponent) header!: HeaderComponent;
  showFiller = false;
}
