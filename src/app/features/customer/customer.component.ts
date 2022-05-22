import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Observable} from "rxjs";
import {CustomerModel} from "./customer.model";
import {CustomerService} from "./customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CustomerComponent implements OnInit {
  customers$!: Observable<CustomerModel[]>;

  // Table variables
  displayedColumns = ['First Name', 'Last Name', 'Address', 'Phone', 'Start Date'];
  expandedRow!: CustomerModel | null;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomers();
    this.customers$ = this.customerService.customers;
  }

}
