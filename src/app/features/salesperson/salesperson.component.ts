import {Component, OnInit} from '@angular/core';
import {SalespersonService} from "./salesperson.service";
import {SalespersonModel} from "./salesperson.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-salesperson',
  templateUrl: './salesperson.component.html',
  styleUrls: ['./salesperson.component.css']
})
export class SalespersonComponent implements OnInit {
  salesPeople$!: Observable<SalespersonModel[]>

  constructor(private salespersonService: SalespersonService) { }

  ngOnInit(): void {
    this.salespersonService.getSalesPeopleList();
    this.salesPeople$ = this.salespersonService.salesPeople;
  }

}
