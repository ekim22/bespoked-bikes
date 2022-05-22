import { Component, OnInit } from '@angular/core';
import {SalesService} from "./sales.service";
import {Observable} from "rxjs";
import {SalesModel} from "./sales.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  sales$!: Observable<SalesModel[]>;

  // Table variables
  displayedColumns = ['Sale Date', 'Customer', 'Product', 'Salesperson', 'Price', 'Salesperson Commission' ];

  constructor(private salesService: SalesService,
              private router: Router) { }

  ngOnInit(): void {
    this.salesService.getSales();
    this.sales$ = this.salesService.sales;
  }

  viewSale(sale: SalesModel) {
    this.router.navigateByUrl('sales/details', {state: {sale: sale}});
  }

}
