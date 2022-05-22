import {Component, OnDestroy, OnInit} from '@angular/core';
import {SalesService} from "./sales.service";
import {Observable, Subscription} from "rxjs";
import {SalesModel} from "./sales.model";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit, OnDestroy {
  sales$!: Subscription;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  dataSource = new MatTableDataSource<SalesModel>([]);

  // Table variables
  displayedColumns = ['Sale Date', 'Customer', 'Product', 'Salesperson', 'Price', 'Salesperson Commission' ];

  constructor(private salesService: SalesService,
              private router: Router) { }

  ngOnInit(): void {
    this.salesService.getSales();
    this.sales$ = this.salesService.sales.subscribe(sales => {
      this.dataSource = new MatTableDataSource<SalesModel>(sales);
    });}

  ngOnDestroy() {
    this.sales$.unsubscribe();
  }

  viewSale(sale: SalesModel) {
    this.router.navigateByUrl('sales/details', {state: {sale: sale}});
  }

  startRangeChanged(startDate: any) {
    this.dataSource.data = this.dataSource.data.filter(e => new Date(e.saleDate) >= startDate);
  }

  endRangeChanged(endDate: any) {
    this.dataSource.data = this.dataSource.data.filter(e => new Date(e.saleDate) <= endDate);
  }

  clearDateRange() {
    this.range.get('start')?.patchValue(null);
    this.range.get('end')?.patchValue(null);
    this.dataSource = new MatTableDataSource<SalesModel>(this.salesService.salesArray);
  }

}
