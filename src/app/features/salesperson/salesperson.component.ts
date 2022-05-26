import {Component, OnInit} from '@angular/core';
import {SalespersonService} from "./salesperson.service";
import {SalespersonModel} from "./salesperson.model";
import {Observable} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NgForm} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-salesperson',
  templateUrl: './salesperson.component.html',
  styleUrls: ['./salesperson.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SalespersonComponent implements OnInit {
  salesPeople$!: Observable<SalespersonModel[]>;

  // Table variables
  displayedColumns = ['First Name', 'Last Name', 'Address', 'Phone', 'Start Date', 'Termination Date', 'Manager'];
  expandedRow!: SalespersonModel | null;

  constructor(private salespersonService: SalespersonService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.salespersonService.getSalesPeople();
    this.salesPeople$ = this.salespersonService.salesPeople;
  }

  updateInfo(position: number, id: string, form: NgForm) {
    this.salespersonService.updateSalesperson(position, id, form.value);
    this._snackBar.open("Salesperson has been updated.", "OK", {
      duration: 2000
    });
  }

}
