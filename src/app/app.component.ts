import {Component, ViewChild} from '@angular/core';
import {HeaderComponent} from "./core/header/header.component";
import {LoadingService} from "./core/loading/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(HeaderComponent) header!: HeaderComponent;
  loading$ = this.loader.loading$;
  showFiller = false;

  constructor(public loader: LoadingService) {
  }
}
